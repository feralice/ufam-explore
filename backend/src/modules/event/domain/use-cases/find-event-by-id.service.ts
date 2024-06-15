import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class GetEventByIdService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.evento.findUnique({ where: { id } });
  }
}
