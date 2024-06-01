import { PostRepository } from '@modules/post/domain/repositories/post.repository';
import { DownvoteRepository } from '@modules/votes/downvote/downvote.repository';
import { UpvoteRepository } from '@modules/votes/upvote/upvote.repository';
import { Injectable } from '@nestjs/common';

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
              post.id,
              userId,
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
