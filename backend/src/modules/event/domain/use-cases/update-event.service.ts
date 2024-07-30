import { Injectable, Logger } from '@nestjs/common';
import { Evento } from '@prisma/client';
import { CreateEventDto } from '../../application/dto/create-event.dto';
import { UpdateEventDto } from '../../application/dto/update-event.dto';
import { EventRepository } from '../../infrastructure/event-repository';

@Injectable()
export class UpdateEventService {
  private readonly logger = new Logger(UpdateEventService.name);

  constructor(private readonly eventRepository: EventRepository) {}

  async upsertEvent(
    eventId: string | null,
    updateEventDto: UpdateEventDto | CreateEventDto,
  ): Promise<Evento> {
    this.logger.log(`Starting upsert for eventId: ${eventId}`);
    this.logger.debug(`UpdateEventDto: ${JSON.stringify(updateEventDto)}`);

    try {
      const result = await this.eventRepository.upsertEvent(
        eventId,
        updateEventDto,
      );
      this.logger.log(`Successfully upserted event with eventId: ${eventId}`);
      this.logger.debug(`Result: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to upsert event with eventId: ${eventId}`,
        error.stack,
      );
      throw error;
    }
  }
}
