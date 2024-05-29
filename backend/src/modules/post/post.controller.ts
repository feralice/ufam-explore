import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/Login.decorator';
import { CreatePostResponse } from './dto/create/create-post-response.dto';
import { CreatePostDto } from './dto/create/create-post.-request.dto';
import { GetVotesInAPostResponseDto } from './dto/get-votes/get-votes-response.dto';
import { PostService } from './post.service';

@Public()
@ApiTags('Post')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create-post')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The post has been successfully created',
    type: CreatePostResponse,
  })
  async create(
    @Body('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CreatePostResponse> {
    return await this.postService.create(userId, createPostDto, file);
  }

  @Get(':postId/upvotes/count')
  @ApiOperation({ summary: 'Get upvotes count of a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upvotes count retrieved successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async getUpvotesCount(@Param('postId') postId: string): Promise<number> {
    return this.postService.getUpvotesInAPost(postId);
  }

  @Get(':postId/downvotes/count')
  @ApiOperation({ summary: 'Get downvotes count of a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Downvotes count retrieved successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async getDownvotesCount(@Param('postId') postId: string): Promise<number> {
    return this.postService.getDownvotesInAPost(postId);
  }

  @Get(':postId/votes/count')
  @ApiOperation({ summary: 'Get votes count of a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Votes count retrieved successfully',
    type: GetVotesInAPostResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async getVotesCount(
    @Param('postId') postId: string,
  ): Promise<GetVotesInAPostResponseDto> {
    return this.postService.getVotesInAPost(postId);
  }

  @Get('/all-posts')
  async getAllPosts() {
    return this.postService.getAllPosts();
  }
}
