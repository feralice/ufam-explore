import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class FindAllTagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }
}
