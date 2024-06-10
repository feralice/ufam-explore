import { Injectable } from '@nestjs/common';
import { DownvoteRepository } from '../../../votes/infrastructure/downvote.repository';
import { UpvoteRepository } from '../../../votes/infrastructure/upvote.repository';
import { PostRepository } from '../../infrastructure/repositories/post.repository';

@Injectable()
export class GetAllPostsUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly upvoteRepository: UpvoteRepository,
    private readonly downvoteRepository: DownvoteRepository,
  ) {}

  async execute(userId: string) {
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
              userId,
              post.id,
            );

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
