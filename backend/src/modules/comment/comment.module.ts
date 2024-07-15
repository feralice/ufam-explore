import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CommentsController } from './application/comment.controller';
import { CreateCommentUseCase } from './domain/create/create-comment.service';
import { CommentsRepository } from './infrastructure/comment.repository';

@Module({
  controllers: [CommentsController],
  providers: [CreateCommentUseCase, CommentsRepository, PrismaService],
})
export class CommentsModule {}
