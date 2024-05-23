import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/adapters/cloudinary/cloudinary.module';
import { TagModule } from '../tag/tag.module';
import { UpvoteRepository } from '../votes/upvote/upvote.repository';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [TagModule, CloudinaryModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, UpvoteRepository],
})
export class PostModule {}
