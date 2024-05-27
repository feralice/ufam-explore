import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileResponse {
  @ApiProperty({
    type: Number,
    description: 'id do perfil',
    example: '1',
  })
  id: Number;

  @ApiProperty({
    type: String,
    description: 'Nome do perfil',
    example: 'Empresa',
  })
  nome: string;
}
