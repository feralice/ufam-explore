import { Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user-id.decorator';
import { DownvoteService } from './downvote/downvote.service';
import { UpvoteResponseDto } from './upvote/dto/upvote-response.dto';
import { UpvoteService } from './upvote/upvote.service';

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
  upvotePost(
    @UserId() userId: string,
    @Param('postId') postId: string,
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
  downvotePost(
    @UserId() userId: string,
    @Param('postId') postId: string,
  ): Promise<UpvoteResponseDto> {
    return this.downvoteService.downvotePost(userId, postId);
  }
}
