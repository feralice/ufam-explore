import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class EditPostDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Título do post',
    example: 'Post de exemplo',
  })
  titulo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Texto do post',
    example: 'Texto do post de exemplo',
  })
  texto?: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Id do evento',
    example: '375c651a-b37d-40e5-853e-411417f8baf5',
  })
  eventoId?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Nome das tags',
    example: ['Geral'],
  })
  tags?: string[];
}
