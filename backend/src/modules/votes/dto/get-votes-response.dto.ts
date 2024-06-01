import { ApiProperty } from "@nestjs/swagger";

export class GetVotesInAPostResponseDto {
  @ApiProperty({
    description: 'Upvotes count',
    example: 0,
  })
  upvotes: number;

  @ApiProperty({
    description: 'Downvotes count',
    example: 0,
  })
  downvotes: number;
}