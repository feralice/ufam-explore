import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateTagResponseDto } from '../../application/dto/create-tag-response.dto';

@Injectable()
export class CreateTagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(nome: string): Promise<CreateTagResponseDto> {
    const tag = await this.prisma.tag.create({ data: { nome } });
    return { id: tag.id, nome: tag.nome };
  }
}
