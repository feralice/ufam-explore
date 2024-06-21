import { Injectable } from '@nestjs/common';
import { Postagem } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreatePostDto } from '../../application/dto/create/create-post.-request.dto';
import { EditPostDto } from '../../application/dto/edit/edit-post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    usuarioId: string,
    data: CreatePostDto,
    imagemUrl?: string,
  ): Promise<Postagem> {
    const { titulo, texto, eventoId, tags } = data;

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
      },
      include: {
        tags: true,
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

  async getPostById(postId: string) {
    return await this.prisma.postagem.findUnique({
      where: { id: postId },
      include: {
        usuario: true,
        tags: true,
      },
    });
  }

  async getAllPosts() {
    return await this.prisma.postagem.findMany({
      include: {
        usuario: true,
        tags: true,
      },
    });
  }

  async editPostById(postId: string, data: EditPostDto, imagemUrl?: string) {
    const { titulo, texto } = data;

    const post = await this.getPostById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    return await this.prisma.postagem.update({
      where: { id: postId },
      data: {
        titulo,
        texto,
        imagemUrl,
      },
      include: {
        tags: true,
      },
    });
  }

  async deletePost(postId: string) {
    return await this.prisma.postagem.delete({
      where: {
        id: postId,
      },
    });
  }

  async getPhotoByPostId(postId: string) {
    return await this.prisma.postagem.findUnique({
      where: { id: postId },
      select: {
        imagemUrl: true,
      },
    });
  }

  async getByTag(tagName: string) {
    return this.prisma.postagem.findMany({
      where: {
        tags: {
          some: {
            nome: tagName,
          },
        },
      },
      include: {
        tags: true,
        usuario: true,
        comentarios: true,
      },
    });
  }
}
