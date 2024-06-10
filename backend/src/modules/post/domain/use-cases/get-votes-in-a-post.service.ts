import { Injectable } from '@nestjs/common';
import { GetVotesInAPostResponseDto } from '../../../votes/application/dto/get-votes-response.dto';
import { DownvoteRepository } from '../../../votes/infrastructure/downvote.repository';
import { UpvoteRepository } from '../../../votes/infrastructure/upvote.repository';

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
