import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/auth.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreatePostResponse } from './dto/create/create-post-response.dto';
import { CreatePostDto } from './dto/create/create-post.-request.dto';
import { PostService } from './post.service';

@ApiBearerAuth()
@ApiTags('Post')
@Controller()
@Public()
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
    @UserId() userId: string,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CreatePostResponse> {
    return await this.postService.create(userId, createPostDto, file);
  }
}
