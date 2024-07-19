import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentUseCase } from '../domain/create/create-comment.service';
import { DeleteCommentUseCase } from '../domain/delete/delete-comment.service';
import { GetCommentsByPost } from '../domain/get-by-post/get.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly getCommentsByPostUseCase: GetCommentsByPost,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
  ) {}

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

  @Get('/by-post/:postId')
  @ApiOperation({ summary: 'Get comments by post' })
  @ApiResponse({
    status: 200,
    description: 'The comments have been successfully retrieved.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async getCommentsByPost(@Param('postId') postId: string) {
    return this.getCommentsByPostUseCase.execute(postId);
  }

  @Delete('/delete/:commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async deleteComment(@Param('commentId') commentId: string) {
    return this.deleteCommentUseCase.execute(commentId);
  }
}
