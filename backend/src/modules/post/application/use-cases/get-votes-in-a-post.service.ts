import { DownvoteRepository } from '@modules/votes/downvote/downvote.repository';
import { GetVotesInAPostResponseDto } from '@modules/votes/dto/get-votes-response.dto';
import { UpvoteRepository } from '@modules/votes/upvote/upvote.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetVotesUseCase {
  constructor(
    private readonly upvoteRepository: UpvoteRepository,
    private readonly downvoteRepository: DownvoteRepository,
  ) {}

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
}
