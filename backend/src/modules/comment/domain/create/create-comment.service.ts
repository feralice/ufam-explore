import { Injectable, Logger } from '@nestjs/common';
import { CreateCommentDto } from '../../application/dto/create-comment.dto';
import { CommentsRepository } from '../../infrastructure/comment.repository';

@Injectable()
export class CreateCommentUseCase {
  private readonly logger = new Logger(CreateCommentUseCase.name);

  constructor(private commentsRepository: CommentsRepository) {}

  async execute(createCommentDto: CreateCommentDto) {
    this.logger.log('Creating a new comment...');
    this.logger.debug(`Comment data: ${JSON.stringify(createCommentDto)}`);

    try {
      const newComment = await this.commentsRepository.create(createCommentDto);
      this.logger.log('Comment created successfully');
      this.logger.debug(`Created comment: ${JSON.stringify(newComment)}`);
      return newComment;
    } catch (error) {
      this.logger.error('Failed to create comment', error.stack);
      throw error;
    }
  }
}
