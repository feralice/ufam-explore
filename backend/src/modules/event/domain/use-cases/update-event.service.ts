import { Injectable, NotFoundException } from '@nestjs/common';
import { Evento } from '@prisma/client';
import { UpdateEventDto } from '../../application/dto/update-event.dto';
import { EventRepository } from '../../infrastructure/event-repository';

@Injectable()
export class UpdateEventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async updateEvent(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Evento> {
    const event = await this.eventRepository.getEventById(eventId);
    if (!event) {
      throw new NotFoundException(`Evento com ID ${eventId} não encontrado`);
    }
    return this.eventRepository.updateEvent(eventId, updateEventDto);
  }
}
