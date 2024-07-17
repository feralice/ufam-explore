import { Injectable } from '@nestjs/common';
import { Evento } from '@prisma/client';
import { UpdateEventDto } from '../../application/dto/update-event.dto';
import { EventRepository } from '../../infrastructure/event-repository';

@Injectable()
export class UpdateEventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async upsertEvent(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Evento> {
    return this.eventRepository.upsertEvent(eventId, updateEventDto);
  }
}
