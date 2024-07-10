import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../adapters/cloudinary/cloudinary.module';
import { EventModule } from '../event/event.module';
import { SaveModule } from '../save/save.module';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';
import { DownvoteRepository } from '../votes/infrastructure/downvote.repository';
import { UpvoteRepository } from '../votes/infrastructure/upvote.repository';
import { PostController } from './application/post.controller';
import { CreatePostUseCase } from './domain/use-cases/create-post.service';
import { DeletePostUseCase } from './domain/use-cases/delete-post.service';
import { EditPostUseCase } from './domain/use-cases/edit-post.service';
import { GetAllPostsUseCase } from './domain/use-cases/get-all-posts.service';
import { GetPostByIdService } from './domain/use-cases/get-post-by-id.service';
import { GetPostByTagService } from './domain/use-cases/get-post-by-tag.service';
import { GetVotesUseCase } from './domain/use-cases/get-votes-in-a-post.service';
import { PostRepository } from './infrastructure/repositories/post.repository';

@Module({
  imports: [TagModule, CloudinaryModule, UserModule, SaveModule, EventModule],
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
    GetPostByTagService,
  ],
})
export class PostModule {}
