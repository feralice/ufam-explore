import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Evento } from '@prisma/client';
import { EventService } from '../domain/use-cases/create-event.service';
import { CreateEventDto } from './dto/create-event.dto';

@ApiBearerAuth()
@ApiTags('Evento')
@Controller('evento')
export class EventController {
  constructor(private readonly eventoService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo evento' })
  @ApiResponse({
    status: 201,
    description: 'O evento foi criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async create(@Body() createEventoDto: CreateEventDto): Promise<Evento> {
    return this.eventoService.createEvent(createEventoDto);
  }
}
