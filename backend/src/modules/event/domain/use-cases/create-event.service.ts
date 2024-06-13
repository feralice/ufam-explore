import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateEventDto } from '../../application/dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(createEventDto: CreateEventDto) {
    const { dataInicio, dataFinal, localizacao, titulo, descricao } =
      createEventDto;
    return this.prisma.evento.create({
      data: {
        dataInicio: new Date(dataInicio),
        dataFinal: new Date(dataFinal),
        localizacao,
        titulo,
        descricao,
      },
    });
  }
}
