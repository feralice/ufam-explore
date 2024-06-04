import { ApiProperty } from '@nestjs/swagger';
import { CreateTagResponseDto } from '../../../../../modules/tag/dto/create-tag-response.dto';

export class CreatePostResponse {
  @ApiProperty({
    type: String,
    description: 'Título do post',
    example: 'Post de exemplo',
  })
  titulo: string;

  @ApiProperty({
    type: String,
    description: 'Texto do post',
    example: 'Texto do post de exemplo',
  })
  texto: string;

  @ApiProperty({
    type: String,
    description: 'Id do evento',
    example: '375c651a-b37d-40e5-853e-411417f8baf5',
  })
  eventoId?: string;

  @ApiProperty({
    type: String,
    description: 'URL da imagem do post',
    example: 'http://www.exemplo.com/imagem.jpg',
  })
  imagemUrl?: string;

  @ApiProperty({
    type: [CreateTagResponseDto],
    description: 'Tags associadas ao post',
    example: ['Tag1', 'Tag2'],
    required: false,
  })
  tags?: CreateTagResponseDto[];
}
