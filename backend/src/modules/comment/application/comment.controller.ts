import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentUseCase } from '../domain/create/create-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly createCommentUseCase: CreateCommentUseCase) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.createCommentUseCase.execute(createCommentDto);
  }
}
