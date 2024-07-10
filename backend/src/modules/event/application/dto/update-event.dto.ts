import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Nome do evento' })
  titulo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Descrição do evento' })
  descricao?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2024-07-08T10:00:00Z' })
  dataInicio?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2024-07-08T12:00:00Z' })
  dataFinal?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Localização do evento' })
  localizacao?: string;
}
