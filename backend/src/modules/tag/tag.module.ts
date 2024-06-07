import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TagRepository } from './domain/tag.repository';
import { TagController } from './application/tag.controller';
import { CreateTagService } from './application/use-cases/create-tag.service';
import { FindAllTagsService } from './application/use-cases/find-all.service';
import { FindByAreaService } from './application/use-cases/find-by-area.service';
import { FindByCourseService } from './application/use-cases/find-by-couse.service';
import { FindTagByNameService } from './application/use-cases/find-by-name.service';
import { FindOthersTagsService } from './application/use-cases/find-others-tags.service';

@Module({
  controllers: [TagController],
  providers: [
    PrismaService,
    TagRepository,
    CreateTagService,
    FindAllTagsService,
    FindTagByNameService,
    FindByAreaService,
    FindByCourseService,
    FindOthersTagsService,
  ],
  exports: [
    CreateTagService,
    TagRepository,
    FindAllTagsService,
    FindTagByNameService,
    FindByAreaService,
    FindByCourseService,
    FindOthersTagsService,
  ],
})
export class TagModule {}
