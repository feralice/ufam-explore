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
    description: 'Data do evento',
    example: '2021-10-01T00:00:00.000Z',
  })
  data: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Local do evento',
    example: 'São Paulo',
  })
  local: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Texto do evento',
    example: 'Evento de exemplo',
  })
  texto?: string;
}
