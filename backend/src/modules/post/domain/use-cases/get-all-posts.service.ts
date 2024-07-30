import { Injectable } from '@nestjs/common';
import { SavePostRepository } from '../../../../modules/save/infrastructure/save.repository';
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

      // Use Promise.all to run queries in parallel
      const postsWithVotesAndSaves = await Promise.all(
        posts.map(async (post) => {
          const [upvotes, downvotes, userUpvoted, userDownvoted, isSaved] =
            await Promise.all([
              this.upvoteRepository.getUpvotesCount(post.id),
              this.downvoteRepository.getDownvotesCount(post.id),
              this.upvoteRepository.verifyIfUserAlreadyUpvotedPost(
                post.id,
                userId,
              ),
              this.downvoteRepository.verifyIfUserAlreadyDownvotedPost(
                userId,
                post.id,
              ),
              this.saveRepository.verifyIfUserAlreadySavedPost(userId, post.id),
            ]);

          return {
            ...post,
            upvotes,
            downvotes,
            userUpvoted,
            userDownvoted,
            isSaved,
            createdAt: post.createdAt, // Certifique-se de incluir o campo createdAt
          };
        }),
      );

      // Ordenar por upvotes em ordem decrescente e depois por downvotes em ordem decrescente
      return postsWithVotesAndSaves.sort((a, b) => {
        if (b.upvotes !== a.upvotes) {
          return b.upvotes - a.upvotes;
        } else {
          return b.downvotes - a.downvotes;
        }
      });
    } catch (error) {
      throw new Error('Error getting posts');
    }
  }
}
