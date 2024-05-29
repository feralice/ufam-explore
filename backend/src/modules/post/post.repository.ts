import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CreatePostDto } from './dto/create/create-post.-request.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(usuarioId: string, data: CreatePostDto, imagemUrl?: string) {
    const { titulo, texto, eventoId, tags, cursos } = data;

    return await this.prisma.postagem.create({
      data: {
        titulo: titulo,
        texto,
        imagemUrl,
        usuario: { connect: { id: usuarioId } },
        evento: eventoId ? { connect: { id: eventoId } } : undefined,
        tags: tags
          ? { connect: tags.map((tag) => ({ nome: tag })) }
          : undefined,
        //TODO:: Depois fazer o mesmo para cursos quando for configurado o modulo dele
        // cursos: cursos ? { connect: cursos.map(curso => ({ nome: curso })) } : undefined,
      },
      include: {
        tags: true,
        cursos: true,
      },
    });
  }

  async associateTagsWithPosts(postagemId: string, tags: string[]) {
    if (tags && tags.length) {
      await Promise.all(
        tags.map(async (tagId) => {
          await this.prisma.tagsEmPostagem.create({
            data: {
              tagId,
              postagemId,
            },
          });
        }),
      );
    }
  }

  async associateCoursesWithPosts(postagemId: string, cursos: string[]) {
    if (cursos && cursos.length) {
      await Promise.all(
        cursos.map(async (curso) => {
          await this.prisma.cursosEmPostagem.create({
            data: {
              cursoId: curso,
              postagemId,
            },
          });
        }),
      );
    }
  }

  async getPostById(postId: string) {
    return await this.prisma.postagem.findUnique({
      where: { id: postId },
      include: {
        usuario: true,
        tags: true,
        cursos: true,
      },
    });
  }

  async getAllPosts() {
    return await this.prisma.postagem.findMany({
      include: {
        usuario: true,
        tags: true,
        cursos: true,
      },
    });
  }
}
