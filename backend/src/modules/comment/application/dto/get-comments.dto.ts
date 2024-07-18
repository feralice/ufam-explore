import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  conteudo: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fotoPerfil: string;
}
