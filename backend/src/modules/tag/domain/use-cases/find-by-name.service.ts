import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateTagResponseDto } from '../../application/dto/create-tag-response.dto';

@Injectable()
export class FindTagByNameService {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(nome: string): Promise<CreateTagResponseDto> {
    const tag = await this.prisma.tag.findUnique({ where: { nome } });
    return { id: tag.id, nome: tag.nome };
  }
}
