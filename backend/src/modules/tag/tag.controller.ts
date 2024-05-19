import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import { CreateTagResponseDto } from './dto/create-tag-response.dto';
import { TagService } from './tag.service';

@ApiBearerAuth()
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post(':nome')
  @ApiOperation({ summary: 'Create a tag' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The tag has been successfully created',
    type: CreateTagResponseDto,
  })
  async create(@Param('nome') nome: string): Promise<Tag> {
    return this.tagService.create(nome);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All tags',
  })
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }
}
