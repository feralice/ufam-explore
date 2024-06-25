import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class SavePostDto {
  @ApiProperty({
    description: 'ID do usuário',
    type: String,
    format: 'uuid',
    example: '048a050e-98bb-43f3-ac4c-48aa0f2a6403',
  })
  @IsString()
  @IsUUID()
  usuarioId: string;

  @ApiProperty({
    description: 'ID da postagem',
    type: String,
    format: 'uuid',
    example: '0846915f-b576-455e-9347-3f472a7bb6e0',
  })
  @IsString()
  @IsUUID()
  postagemId: string;
}
