import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create/create-post.-request.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
