import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SavePostController } from './application/save-post.controller';
import { GetSavePostsByUser } from './domain/use-cases/get-posts-by-user.service';
import { SavePostService } from './domain/use-cases/save-post.service';
import { SavePostRepository } from './infrastructure/save.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SavePostController],
  providers: [SavePostService, SavePostRepository, GetSavePostsByUser],
  exports: [SavePostService, SavePostRepository],
})
export class SaveModule {}
