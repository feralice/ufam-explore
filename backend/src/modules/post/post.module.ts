import { Module } from '@nestjs/common';
import { TagModule } from '../tag/tag.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [TagModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
