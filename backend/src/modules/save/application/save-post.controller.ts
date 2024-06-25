import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SavePostService } from '../domain/use-cases/save-post.service';
import { SavePostDto } from './dto/save-post.dto';

@ApiBearerAuth()
@ApiTags('Save-Post')
@Controller('save-post')
export class SavePostController {
  constructor(private readonly savePostService: SavePostService) {}

  @Post()
  @ApiOperation({ summary: 'Salva uma postagem para um usuário' })
  @ApiResponse({ status: 201, description: 'Postagem salva com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async savePost(@Body() savePostDto: SavePostDto) {
    const { usuarioId, postagemId } = savePostDto;
    return this.savePostService.savePost(usuarioId, postagemId);
  }
}
