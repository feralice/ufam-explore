import { Injectable } from '@nestjs/common';
import { Evento } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateEventDto } from '../application/dto/update-event.dto';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateEvent(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Evento> {
    return this.prisma.evento.update({
      where: { id: eventId },
      data: updateEventDto,
    });
  }

  async getEventById(eventId: string): Promise<Evento> {
    return this.prisma.evento.findUnique({
      where: { id: eventId },
    });
  }
}
