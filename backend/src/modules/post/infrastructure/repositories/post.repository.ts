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
    const posts = await this.prisma.postagem.findMany({
      include: {
        usuario: true,
        tags: true,
        upvotes: true,
      },
    });

    return posts.sort((a, b) => b.upvotes.length - a.upvotes.length);
  }

  async editPostById(
    postId: string,
    data: EditPostDto,
    photoUrl: string,
  ): Promise<Postagem> {
    const { titulo, texto, eventoId, tags } = data;

    return await this.prisma.postagem.update({
      where: { id: postId },
      data: {
        titulo,
        texto,
        imagemUrl: photoUrl,
        evento: eventoId ? { connect: { id: eventoId } } : undefined,
        tags: tags ? { set: tags.map((tag) => ({ nome: tag })) } : undefined,
      },
      include: {
        tags: true,
        evento: true,
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
