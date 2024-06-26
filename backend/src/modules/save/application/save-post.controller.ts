import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetSavePostsByUser } from '../domain/use-cases/get-posts-by-user.service';
import { SavePostService } from '../domain/use-cases/save-post.service';
import { SavePostDto } from './dto/save-post.dto';

@ApiBearerAuth()
@ApiTags('Save-Post')
@Controller('save-post')
export class SavePostController {
  constructor(
    private readonly savePostService: SavePostService,
    private readonly getPostsByUserService: GetSavePostsByUser,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Salva uma postagem para um usuário' })
  @ApiResponse({ status: 201, description: 'Postagem salva com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async savePost(@Body() savePostDto: SavePostDto) {
    const { usuarioId, postagemId } = savePostDto;
    return this.savePostService.saveOrUnsavePost(usuarioId, postagemId);
  }

  @Get('/save-by-user')
  @ApiOperation({ summary: 'Lista todas as postagens salvas por um usuário' })
  @ApiResponse({ status: 200, description: 'Postagens salvas' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 404, description: 'Postagens não encontradas' })
  async getSavedPostsByUser(@Query('usuarioId') usuarioId: string) {
    return this.getPostsByUserService.getSavedPostsByUser(usuarioId);
  }
}
