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
import { Public } from '../../decorators/auth.decorator';
import { CreatePostResponse } from './dto/create/create-post-response.dto';
import { CreatePostDto } from './dto/create/create-post.-request.dto';
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
    @Body() createPostDto: CreatePostDto,
    @Body('userId') userId: '1151183c-0355-43a2-91d0-f9f3453faf27',
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CreatePostResponse> {
    return await this.postService.create(userId, createPostDto, file);
  }

  @Public()
  @Get('/all-posts/:userId')
  async getAllPosts(@Param ('userId') userId: string){
    return this.postService.getAllPosts(userId);
  }
}
