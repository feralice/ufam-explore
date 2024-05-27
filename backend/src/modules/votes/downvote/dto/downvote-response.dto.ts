import { ApiProperty } from '@nestjs/swagger';

export class DownvoteResponseDto {
  @ApiProperty({
    description: 'Downvote ID',
    example: '8dcb4688-c7df-46fa-8415-a4cd714b41ec',
  })
  id: string;

  @ApiProperty({
    description: 'Post ID',
    example: '8dcb4688-c7df-46fa-8415-a4cd714b41ec',
  })
  postagemId: string;

  @ApiProperty({
    description: 'User ID',
    example: '8dcb4688-c7df-46fa-8415-a4cd714b41ec',
  })
  usuarioId: string;
}
