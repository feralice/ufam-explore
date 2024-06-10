import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventService } from '../domain/use-cases/create-event.service';
import { CreateEventDto } from './dto/create-event.dto';

@ApiBearerAuth()
@ApiTags('Evento')
@Controller('evento')
export class EventController {
  constructor(private readonly eventoService: EventService) {}

  @Post()
  async create(@Body() createEventoDto: CreateEventDto) {
    return this.eventoService.createEvent(createEventoDto);
  }
}
