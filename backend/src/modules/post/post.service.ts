import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../adapters/cloudinary/cloudinary.service';
import { TagRepository } from '../tag/tag.repository';
import { DownvoteRepository } from '../votes/downvote/downvote.repository';
import { GetVotesInAPostResponseDto } from '../votes/dto/get-votes-response.dto';
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
    private readonly downvoteRepository: DownvoteRepository,
  ) {}

  async create(
    usuarioId: string,
    data: CreatePostDto,
    file?: Express.Multer.File,
  ): Promise<CreatePostResponse> {
    try {
      const photoUrlInCloudinary = await this.uploadFileToCloudinary(file);

      const post = await this.postRepository.create(
        usuarioId,
        data,
        photoUrlInCloudinary,
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

  async getDownvotesInAPost(postId: string) {
    try {
      return await this.downvoteRepository.getDownvotesCount(postId);
    } catch (error) {
      throw new Error('Error getting downvotes count');
    }
  }

  async getVotesInAPost(postId: string): Promise<GetVotesInAPostResponseDto> {
    try {
      const upvotes = await this.upvoteRepository.getUpvotesCount(postId);
      const downvotes = await this.downvoteRepository.getDownvotesCount(postId);

      return {
        upvotes,
        downvotes,
      };
    } catch (error) {
      throw new Error('Error getting votes count');
    }
  }

  private async associateTagsWithPost(postId: string, tags: string[]) {
    const tagsIds = await this.tagRepository.findIdsByName(tags);
    await this.postRepository.associateTagsWithPosts(
      postId,
      tagsIds.map((tag) => tag.id),
    );
  }

  private async uploadFileToCloudinary(
    file?: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      console.error('No file provided');
      return '';
    }
    try {
      const { url } = await this.cloudinaryService.uploadFile(file);
      return url;
    } catch (error) {
      throw new Error('Error uploading file to Cloudinary');
    }
  }

  async getAllPosts(userId: string) {
    try {
      const posts = await this.postRepository.getAllPosts();
      const postsWithVotes = await Promise.all(
        posts.map(async (post) => {
          const upvotes = await this.upvoteRepository.getUpvotesCount(post.id);

          const downvotes = await this.downvoteRepository.getDownvotesCount(
            post.id,
          );

          const userUpvoted =
            await this.upvoteRepository.verifyIfUserAlreadyUpvotedPost(
              post.id,
              userId,
            );

          const userDownvoted =
            await this.downvoteRepository.verifyIfUserAlreadyDownvotedPost(
              post.id,
              userId,
            );

          console.log('userUpvoted', userUpvoted);
          console.log('userDownvoted', userDownvoted);

          return {
            ...post,
            upvotes,
            downvotes,
            userUpvoted,
            userDownvoted,
          };
        }),
      );

      return postsWithVotes;
    } catch (error) {
      throw new Error('Error getting posts');
    }
  }
}
