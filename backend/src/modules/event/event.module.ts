import { Module } from '@nestjs/common';
import { EventController } from './application/event.controller';
import { EventService } from './domain/use-cases/create-event.service';
import { GetEventByIdService } from './domain/use-cases/find-event-by-id.service';

@Module({
  controllers: [EventController],
  providers: [EventService, GetEventByIdService],
})
export class EventModule {}
