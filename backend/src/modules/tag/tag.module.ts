import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TagController } from './application/tag.controller';
import { TagRepository } from './infrastructure/tag.repository';
import { CreateTagService } from './domain/use-cases/create-tag.service';
import { FindAllTagsService } from './domain/use-cases/find-all.service';
import { FindByAreaService } from './domain/use-cases/find-by-area.service';
import { FindByCourseService } from './domain/use-cases/find-by-couse.service';
import { FindTagByNameService } from './domain/use-cases/find-by-name.service';
import { FindOthersTagsService } from './domain/use-cases/find-others-tags.service';

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
