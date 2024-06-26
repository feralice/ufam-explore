import { Injectable } from '@nestjs/common';
import { SavePostRepository } from 'src/modules/save/infrastructure/save.repository';
import { DownvoteRepository } from '../../../votes/infrastructure/downvote.repository';
import { UpvoteRepository } from '../../../votes/infrastructure/upvote.repository';
import { PostRepository } from '../../infrastructure/repositories/post.repository';

@Injectable()
export class GetAllPostsUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly upvoteRepository: UpvoteRepository,
    private readonly downvoteRepository: DownvoteRepository,
    private readonly saveRepository: SavePostRepository,
  ) {}

  async execute(userId: string) {
    try {
      const posts = await this.postRepository.getAllPosts();
      const postsWithVotesAndSaves = await Promise.all(
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
              userId,
              post.id,
            );
          const isSaved =
            await this.saveRepository.verifyIfUserAlreadySavedPost(
              userId,
              post.id,
            );

          return {
            ...post,
            upvotes,
            downvotes,
            userUpvoted,
            userDownvoted,
            isSaved,
          };
        }),
      );

      return postsWithVotesAndSaves;
    } catch (error) {
      throw new Error('Error getting posts');
    }
  }
}
