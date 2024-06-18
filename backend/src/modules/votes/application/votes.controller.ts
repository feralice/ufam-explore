import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DownvoteService } from '../domain/downvote.service';
import { UpvoteService } from '../domain/upvote.service';
import { DownvoteResponseDto } from './downvote/dto/downvote-response.dto';
import { GetVotesInAPostResponseDto } from './dto/get-votes-response.dto';
import { UpvoteResponseDto } from './upvote/dto/upvote-response.dto';

@ApiBearerAuth()
@ApiTags('Post')
@Controller()
export class VotesController {
  constructor(
    private readonly upvoteService: UpvoteService,
    private readonly downvoteService: DownvoteService,
  ) {}

  @Post(':postId/upvote')
  @ApiOperation({ summary: 'Upvote a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post upvoted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Post already upvoted',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async upvotePost(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ): Promise<UpvoteResponseDto> {
    return this.upvoteService.upvotePost(userId, postId);
  }
  
  @Post(':postId/downvote')
  @ApiOperation({ summary: 'Downvote a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post downvoted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Post already downvoted',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async downvotePost(
    @Body('userId') userId: string,
    @Param('postId') postId: string,
  ): Promise<DownvoteResponseDto> {
    return this.downvoteService.downvotePost(userId, postId);
  }

  @Get(':postId/upvotes/count')
  @ApiOperation({ summary: 'Get upvotes count of a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upvotes count retrieved successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async getUpvotesCount(@Param('postId') postId: string): Promise<number> {
    return this.upvoteService.getUpvotesInAPost(postId);
  }

  @Get(':postId/downvotes/count')
  @ApiOperation({ summary: 'Get downvotes count of a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Downvotes count retrieved successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async getDownvotesCount(@Param('postId') postId: string): Promise<number> {
    return this.downvoteService.getDownvotesInAPost(postId);
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
    const upvotes = await this.upvoteService.getUpvotesInAPost(postId);
    const downvotes = await this.downvoteService.getDownvotesInAPost(postId);

    return { upvotes, downvotes };
  }

  @Delete(':postId/upvote')
  @ApiOperation({ summary: 'Remove upvote from a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upvote removed successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async removeUpvote(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ): Promise<HttpStatus> {
    await this.upvoteService.deleteUpvote(userId, postId);
    return HttpStatus.OK;
  }

  @Delete(':postId/downvote')
  @ApiOperation({ summary: 'Remove downvote from a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Downvote removed successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  async removeDownvote(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ): Promise<HttpStatus> {
    await this.downvoteService.deleteDownvote(userId, postId);
    return HttpStatus.OK;
  }
}
