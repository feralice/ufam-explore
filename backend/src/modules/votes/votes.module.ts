import { Module } from '@nestjs/common';
import { PostRepository } from '../post/domain/repositories/post.repository';
import { PostModule } from '../post/post.module';
import { TagModule } from '../tag/tag.module';
import { DownvoteRepository } from './downvote/downvote.repository';
import { DownvoteService } from './downvote/downvote.service';
import { UpvoteRepository } from './upvote/upvote.repository';
import { UpvoteService } from './upvote/upvote.service';
import { VotesController } from './votes.controller';

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
