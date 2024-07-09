import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'Este é um comentário de teste',
  })
  @IsNotEmpty()
  @IsString()
  conteudo: string;

  @ApiProperty({
    description: 'The ID of the user making the comment',
    example: '031cf2dd-9a50-4571-a4cb-122ea2fd7661',
  })
  @IsNotEmpty()
  @IsString()
  usuarioId: string;

  @ApiProperty({
    description: 'The ID of the post being commented on',
    example: '0d7472d7-851a-4e99-a59c-3d12b500479e',
  })
  @IsNotEmpty()
  @IsString()
  postagemId: string;
}
