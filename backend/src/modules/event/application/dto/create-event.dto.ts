import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: String,
    description: 'Data e hora de início do evento',
    example: '2021-10-01T09:00:00.000Z',
  })
  dataInicio: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: String,
    description: 'Data e hora de término do evento',
    example: '2021-10-01T10:00:00.000Z',
  })
  dataFinal: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Localização do evento',
    example: 'São Paulo',
  })
  localizacao: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Título do evento',
    example: 'Reunião de Negócios',
  })
  titulo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Descrição do evento',
    example: 'Discussão sobre a proposta de parceria',
  })
  descricao?: string;
}
