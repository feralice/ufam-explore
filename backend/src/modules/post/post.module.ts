import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CloudinaryModule } from '../../adapters/cloudinary/cloudinary.module';
import { TagModule } from '../tag/tag.module';
import { DownvoteRepository } from '../votes/downvote/downvote.repository';
import { UpvoteRepository } from '../votes/upvote/upvote.repository';
import { PostController } from './application/post.controller';
import { CreatePostUseCase } from './application/use-cases/create-post.service';
import { GetAllPostsUseCase } from './application/use-cases/get-all-posts.service';
import { GetVotesUseCase } from './application/use-cases/get-votes-in-a-post.service';
import { PostRepository } from './domain/repositories/post.repository';

@Module({
  imports: [TagModule, CloudinaryModule],
  controllers: [PostController],
  providers: [
    PrismaService,
    PostRepository,
    CreatePostUseCase,
    GetAllPostsUseCase,
    GetVotesUseCase,
    UpvoteRepository,
    DownvoteRepository,
  ],
})
export class PostModule {}
