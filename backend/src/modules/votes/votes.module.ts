import { PostRepository } from '@modules/post/domain/repositories/post.repository';
import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { DownvoteRepository } from './downvote/downvote.repository';
import { DownvoteService } from './downvote/downvote.service';
import { UpvoteRepository } from './upvote/upvote.repository';
import { UpvoteService } from './upvote/upvote.service';
import { VotesController } from './votes.controller';

@Module({
  imports: [PostModule],
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
