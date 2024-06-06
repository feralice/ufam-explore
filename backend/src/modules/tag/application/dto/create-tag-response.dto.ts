import { ApiProperty } from '@nestjs/swagger';

export class CreateTagResponseDto {
  @ApiProperty({
    type: String,
    description: 'Id da tag',
    example: '1',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Nome da tag',
    example: 'Geral',
  })
  nome: string;
}
