import { Injectable, Logger } from '@nestjs/common';
import { CommentsRepository } from '../../infrastructure/comment.repository';

@Injectable()
export class GetCommentsByPost {
  private readonly logger = new Logger(GetCommentsByPost.name);

  constructor(private commentsRepository: CommentsRepository) {}

    async execute(postId: string) {
        this.logger.log('Getting comments by post...');
        this.logger.debug(`Post ID: ${postId}`);
    
        try {
        const comments = await this.commentsRepository.findByPost(postId);
        this.logger.log('Comments retrieved successfully');
        this.logger.debug(`Retrieved comments: ${JSON.stringify(comments)}`);
        return comments;
        } catch (error) {
        this.logger.error('Failed to retrieve comments', error.stack);
        throw error;
        }
    }
}
