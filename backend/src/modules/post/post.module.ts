import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../adapters/cloudinary/cloudinary.module';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';
import { DownvoteRepository } from '../votes/downvote/downvote.repository';
import { UpvoteRepository } from '../votes/upvote/upvote.repository';
import { PostController } from './application/post.controller';
import { CreatePostUseCase } from './application/use-cases/create-post.service';
import { DeletePostUseCase } from './application/use-cases/delete-post.service';
import { EditPostUseCase } from './application/use-cases/edit-post.service';
import { GetAllPostsUseCase } from './application/use-cases/get-all-posts.service';
import { GetPostByIdService } from './application/use-cases/get-post-by-id.service';
import { GetVotesUseCase } from './application/use-cases/get-votes-in-a-post.service';
import { PostRepository } from './domain/repositories/post.repository';

@Module({
  imports: [TagModule, CloudinaryModule, UserModule],
  controllers: [PostController],
  providers: [
    PostRepository,
    CreatePostUseCase,
    GetAllPostsUseCase,
    GetVotesUseCase,
    UpvoteRepository,
    DownvoteRepository,
    EditPostUseCase,
    DeletePostUseCase,
    GetPostByIdService,
  ],
})
export class PostModule {}
