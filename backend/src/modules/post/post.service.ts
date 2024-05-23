import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/adapters/cloudinary/cloudinary.service';
import { TagRepository } from '../tag/tag.repository';
import { UpvoteRepository } from '../votes/upvote/upvote.repository';
import { CreatePostResponse } from './dto/create/create-post-response.dto';
import { CreatePostDto } from './dto/create/create-post.-request.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly upvoteRepository: UpvoteRepository,
  ) {}

  async create(
    usuarioId: string,
    data: CreatePostDto,
    file?: Express.Multer.File,
  ): Promise<CreatePostResponse> {
    try {
      const photoInCloudinary = await this.uploadFileToCloudinary(file);

      const post = await this.postRepository.create(
        usuarioId,
        data,
        photoInCloudinary.url,
      );

      await this.associateTagsWithPost(post.id, data.tags);

      //TODO:: Depois fazer o mesmo para cursos quando for configurado o modulo dele
      //await this.postRepository.associateCoursesWithPosts(post.id, data.cursos);

      return post;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating post');
    }
  }

  async getUpvotesInAPost(postId: string) {
    try {
      return await this.upvoteRepository.getUpvotesCount(postId);
    } catch (error) {
      throw new Error('Error getting upvotes count');
    }
  }

  private async associateTagsWithPost(postId: string, tags: string[]) {
    const tagsIds = await this.tagRepository.findIdsByName(tags);
    await this.postRepository.associateTagsWithPosts(
      postId,
      tagsIds.map((tag) => tag.id),
    );
  }

  private async uploadFileToCloudinary(file: Express.Multer.File) {
    let imageUpload;
    if (file) {
      imageUpload = await this.cloudinaryService.uploadFile(file);
    } else {
      console.error('No file provided');
    }

    return imageUpload;
  }
}
