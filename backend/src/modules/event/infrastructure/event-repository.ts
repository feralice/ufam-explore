import { Injectable } from '@nestjs/common';
import { Evento } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEventDto } from '../application/dto/create-event.dto';
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

  async getEventById(eventId: string): Promise<Evento | null> {
    return this.prisma.evento.findUnique({
      where: { id: eventId },
    });
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Evento> {
    return this.prisma.evento.create({
      data: createEventDto,
    });
  }

  async upsertEvent(
    eventId: string | null,
    updateEventDto: UpdateEventDto | CreateEventDto,
  ): Promise<Evento> {
    if (eventId) {
      const event = await this.getEventById(eventId);
      if (event) {
        return this.updateEvent(eventId, updateEventDto as UpdateEventDto);
      }
    }
    return this.createEvent(updateEventDto as CreateEventDto);
  }
}
