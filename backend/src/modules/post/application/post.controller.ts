import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Postagem } from '@prisma/client';
import { CreatePostUseCase } from '../domain/use-cases/create-post.service';
import { DeletePostUseCase } from '../domain/use-cases/delete-post.service';
import { EditPostUseCase } from '../domain/use-cases/edit-post.service';
import { FilteredPostsService } from '../domain/use-cases/filtered-posts.service';
import { GetAllPostsUseCase } from '../domain/use-cases/get-all-posts.service';
import { GetPostByIdService } from '../domain/use-cases/get-post-by-id.service';
import { GetPostByTagService } from '../domain/use-cases/get-post-by-tag.service';
import { GetVotesUseCase } from '../domain/use-cases/get-votes-in-a-post.service';
import { CreatePostResponse } from './dto/create/create-post-response.dto';
import { CreatePostDto } from './dto/create/create-post.-request.dto';
import { DeletePostResponseDto } from './dto/delete/delete-post-response.dto';
import { EditPostDto } from './dto/edit/edit-post.dto';

@ApiBearerAuth()
@ApiTags('Post')
@Controller()
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly getVotesUseCase: GetVotesUseCase,
    private readonly editPostUseCase: EditPostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly getPostByIdUseCase: GetPostByIdService,
    private readonly getPostByTagUseCase: GetPostByTagService,
    private readonly filteredPostsService: FilteredPostsService,
  ) {}

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
    @Body('userId') userId: string,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CreatePostResponse> {
    return await this.createPostUseCase.execute(userId, createPostDto, file);
  }

  @Get('/all-posts/:userId')
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved all posts',
  })
  async getAllPosts(@Param('userId') userId: string) {
    return this.getAllPostsUseCase.execute(userId);
  }

  @Get('/:id/upvotes')
  @ApiOperation({ summary: 'Get upvotes for a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved upvotes',
  })
  async getUpvotes(@Param('id') postId: string) {
    return this.getVotesUseCase.getUpvotesInAPost(postId);
  }

  @Get('/:id/downvotes')
  @ApiOperation({ summary: 'Get downvotes for a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved downvotes',
  })
  async getDownvotes(@Param('id') postId: string) {
    return this.getVotesUseCase.getDownvotesInAPost(postId);
  }

  @Get('/:id/votes')
  @ApiOperation({ summary: 'Get all votes for a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved votes',
  })
  async getVotes(@Param('id') postId: string) {
    return this.getVotesUseCase.getVotesInAPost(postId);
  }

  @Patch('edit/:postId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully updated',
    type: EditPostDto,
  })
  async update(
    @Param('postId') postId: string,
    @Body() updatePostDto: EditPostDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Postagem> {
    return await this.editPostUseCase.execute(postId, updatePostDto, file);
  }

  @Delete('delete/:postId')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully deleted',
    type: DeletePostResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found or not authorized to delete',
  })
  async delete(
    @Param('postId') postId: string,
  ): Promise<DeletePostResponseDto> {
    return await this.deletePostUseCase.execute(postId);
  }

  @Get('/post/:postId')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved post',
  })
  async getPostById(@Param('postId') postId: string): Promise<Postagem> {
    return this.getPostByIdUseCase.execute(postId);
  }

  @Get('/get-post-by-tag/:tagName')
  @ApiOperation({ summary: 'Get a post by course name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved post',
  })
  async getPostByCourse(
    @Param('tagName') tagName: string,
  ): Promise<Postagem[]> {
    return this.getPostByTagUseCase.execute(tagName);
  }

  @Get('/filtered-posts')
  @ApiQuery({
    name: 'area',
    required: false,
    description: 'Área do conhecimento para filtrar as postagens',
  })
  @ApiQuery({
    name: 'curso',
    required: false,
    description: 'Curso específico para filtrar as postagens',
  })
  @ApiQuery({
    name: 'tempo',
    required: false,
    description: 'Período de tempo para filtrar as postagens',
  })
  @ApiQuery({
    name: 'searchText',
    required: false,
    description: 'Texto de busca para filtrar as postagens',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de postagens filtradas',
  })
  async getFilteredPostagens(
    @Query('area') area?: string,
    @Query('curso') curso?: string,
    @Query('tempo') tempo?: string,
    @Query('searchText') searchText?: string,
  ): Promise<Postagem[]> {
    return this.filteredPostsService.getFilteredPostagens(
      area,
      curso,
      tempo,
      searchText,
    );
  }
}
