import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Evento } from '@prisma/client';
import { EventService } from '../domain/use-cases/create-event.service';
import { GetEventByIdService } from '../domain/use-cases/find-event-by-id.service';
import { CreateEventDto } from './dto/create-event.dto';

@ApiBearerAuth()
@ApiTags('Evento')
@Controller('evento')
export class EventController {
  constructor(
    private readonly createEvent: EventService,
    private readonly getEventByIdService: GetEventByIdService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo evento' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'O evento foi criado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Parâmetros inválidos.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Não autorizado.',
  })
  async create(@Body() createEventoDto: CreateEventDto): Promise<Evento> {
    return this.createEvent.createEvent(createEventoDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Pega o evento por id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Evento encontrado.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Evento não encontrado.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Não autorizado.',
  })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id') id: string): Promise<Evento> {
    return this.getEventByIdService.findOne(id);
  }
}
