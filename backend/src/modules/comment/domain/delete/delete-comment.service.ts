import { Injectable, Logger } from '@nestjs/common';
import { CommentsRepository } from '../../infrastructure/comment.repository';

@Injectable()
export class DeleteCommentUseCase {
  private readonly logger = new Logger(DeleteCommentUseCase.name);

  constructor(private commentsRepository: CommentsRepository) {}

  async execute(commentId: string): Promise<string> {
    this.logger.log(`Starting deletion of comment with ID: ${commentId}`);

    try {
      await this.commentsRepository.delete(commentId);
      this.logger.log(`Successfully deleted comment with ID: ${commentId}`);
      return 'The comment has been successfully deleted.';
    } catch (error) {
      this.logger.error(
        `Failed to delete comment with ID: ${commentId}`,
        error.stack,
      );
      throw error;
    }
  }
}
