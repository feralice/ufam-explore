import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TagController } from './application/tag.controller';
import { CreateTagService } from './application/use-cases/create-tag/create-tag.service';
import { FindAllTagsService } from './application/use-cases/find-all/find-all.service';
import { FindTagByNameService } from './application/use-cases/find-by-name/find-by-name.service';
import { TagRepository } from './domain/tag.repository';
@Module({
  controllers: [TagController],
  providers: [
    CreateTagService,
    TagRepository,
    CreateTagService,
    FindAllTagsService,
    FindTagByNameService,
    PrismaService,
  ],
  exports: [CreateTagService, TagRepository],
})
export class TagModule {}
