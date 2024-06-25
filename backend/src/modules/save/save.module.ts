import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SavePostController } from './application/save-post.controller';
import { SavePostService } from './domain/use-cases/save-post.service';
import { SavePostRepository } from './infrastructure/save.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SavePostController],
  providers: [SavePostService, SavePostRepository],
  exports: [SavePostService, SavePostRepository],
})
export class SaveModule {}
