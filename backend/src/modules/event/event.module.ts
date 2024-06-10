import { Module } from '@nestjs/common';
import { EventController } from './application/event.controller';
import { EventService } from './domain/use-cases/create-event.service';

@Module({
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
