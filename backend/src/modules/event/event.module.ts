import { Module } from '@nestjs/common';
import { EventController } from './application/event.controller';
import { EventService } from './domain/use-cases/create-event.service';
import { GetEventByIdService } from './domain/use-cases/find-event-by-id.service';
import { UpdateEventService } from './domain/use-cases/update-event.service';
import { EventRepository } from './infrastructure/event-repository';

@Module({
  controllers: [EventController],
  providers: [
    EventService,
    GetEventByIdService,
    EventRepository,
    UpdateEventService,
  ],
  exports: [EventService, GetEventByIdService, EventRepository],
})
export class EventModule {}
