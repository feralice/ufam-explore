import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import { CreateTagResponseDto } from './dto/create-tag-response.dto';
import { CreateTagService } from './use-cases/create-tag/create-tag.service';
import { FindAllTagsService } from './use-cases/find-all/find-all.service';
import { FindTagByNameService } from './use-cases/find-by-name/find-by-name.service';

@ApiBearerAuth()
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(
    private readonly createTagService: CreateTagService,
    private readonly findAllTagsService: FindAllTagsService,
    private readonly findTagByNameService: FindTagByNameService,
  ) {}

  @Post(':nome')
  @ApiOperation({ summary: 'Create a tag' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The tag has been successfully created',
    type: CreateTagResponseDto,
  })
  async create(@Param('nome') nome: string): Promise<CreateTagResponseDto> {
    return this.createTagService.create(nome);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All tags',
  })
  findAll(): Promise<Tag[]> {
    return this.findAllTagsService.findAll();
  }

  @Get('by-name/:nome')
  @ApiOperation({ summary: 'Get tag by name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag by name',
  })
  findByName(@Param('nome') nome: string): Promise<CreateTagResponseDto> {
    return this.findTagByNameService.findByName(nome);
  }
}
