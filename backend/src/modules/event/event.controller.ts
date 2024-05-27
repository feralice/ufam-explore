import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

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
