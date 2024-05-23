import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { PostRepository } from '../post/post.repository';
import { UpvoteRepository } from './upvote/upvote.repository';
import { UpvoteService } from './upvote/upvote.service';
import { VotesController } from './votes.controller';

@Module({
  imports: [PostModule],
  controllers: [VotesController],
  providers: [UpvoteService, UpvoteRepository, PostRepository],
})
export class VotesModule {}
