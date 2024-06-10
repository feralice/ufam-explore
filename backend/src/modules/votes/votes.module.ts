import { Module } from '@nestjs/common';
import { PostRepository } from '../post/infrastructure/repositories/post.repository';
import { PostModule } from '../post/post.module';
import { TagModule } from '../tag/tag.module';
import { VotesController } from './application/votes.controller';
import { DownvoteService } from './domain/downvote.service';
import { UpvoteService } from './domain/upvote.service';
import { DownvoteRepository } from './infrastructure/downvote.repository';
import { UpvoteRepository } from './infrastructure/upvote.repository';

@Module({
  imports: [PostModule, TagModule],
  controllers: [VotesController],
  providers: [
    UpvoteService,
    UpvoteRepository,
    PostRepository,
    DownvoteService,
    DownvoteRepository,
  ],
})
export class VotesModule {}
