import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(createEventDto: CreateEventDto) {
    const { data, local, texto } = createEventDto;
    return this.prisma.evento.create({
      data: {
        data: new Date(data),
        local,
        texto,
      },
    });
  }
}
