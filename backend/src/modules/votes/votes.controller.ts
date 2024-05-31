import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserId } from '../../decorators/user-id.decorator';
import { DownvoteService } from './downvote/downvote.service';
import { UpvoteResponseDto } from './upvote/dto/upvote-response.dto';
import { UpvoteService } from './upvote/upvote.service';
import { DownvoteResponseDto } from './downvote/dto/downvote-response.dto';

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
    @Query('userId') userId: string,
    @Param('postId') postId: string,
  ): Promise<DownvoteResponseDto> {
    return this.downvoteService.downvotePost(userId, postId);
  }

  @Get(':postId/votes')
  @ApiOperation({ summary: 'Get votes in a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Votes retrieved successfully',
  })
  async getVotesInPost(
    @UserId() userId: string,
    @Param('postId') postId: string,
  ) {
    const upvotes = await this.upvoteService.getUpvotesInAPost(userId, postId);
    const downvotes = await this.downvoteService.getDownvotesInAPost(
      userId,
      postId,
    );
    return Object.assign({}, upvotes, downvotes);
  }
}
