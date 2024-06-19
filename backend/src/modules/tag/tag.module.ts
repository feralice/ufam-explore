import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TagController } from './application/tag.controller';
import { CreateTagService } from './domain/use-cases/create-tag.service';
import { FindAllTagsService } from './domain/use-cases/find-all.service';
import { FindTagByNameService } from './domain/use-cases/find-by-name.service';
import { TagRepository } from './infrastructure/tag.repository';

@Module({
  controllers: [TagController],
  providers: [
    PrismaService,
    TagRepository,
    CreateTagService,
    FindAllTagsService,
    FindTagByNameService,
  ],
  exports: [
    CreateTagService,
    TagRepository,
    FindAllTagsService,
    FindTagByNameService,
  ],
})
export class TagModule {}
