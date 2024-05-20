// post.service.ts
import { Injectable } from '@nestjs/common';
import { TagRepository } from '../tag/tag.repository';
import { CreatePostResponse } from './dto/create/create-post-response.dto';
import { CreatePostDto } from './dto/create/create-post.-request.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async create(
    usuarioId: string,
    data: CreatePostDto,
  ): Promise<CreatePostResponse> {
    try {
      const post = await this.postRepository.create(usuarioId, data);
      const tagsIds = await this.tagRepository.findIdsByName(data.tags);

      await this.postRepository.associateTagsWithPosts(
        post.id,
        tagsIds.map((tag) => tag.id),
      );
      //TODO:: Depois fazer o mesmo para cursos quando for configurado o modulo dele
      //await this.postRepository.associateCoursesWithPosts(post.id, data.cursos);

      return post;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating post');
    }
  }
}
