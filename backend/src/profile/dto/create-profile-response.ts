import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileResponse {
  @ApiProperty({
    type: String,
    description: 'id do perfil',
    example: '13719f43-b055-4f2f-88a3-f76cdd597f79',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Nome do perfil',
    example: 'Empresa',
  })
  name: string;
}
