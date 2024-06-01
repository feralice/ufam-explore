import { PostRepository } from '@modules/post/domain/repositories/post.repository';
import { TagModule } from '@modules/tag/tag.module';
import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
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
