import { CloudinaryService } from '@adapters/cloudinary/cloudinary.service';
import { CreatePostDto } from '@modules/post/application/dto/create/create-post.-request.dto';
import { PostRepository } from '@modules/post/domain/repositories/post.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async execute(
    usuarioId: string,
    data: CreatePostDto,
    file?: Express.Multer.File,
  ): Promise<any> {
    try {
      const photoUrlInCloudinary = await this.uploadFileToCloudinary(file);
      const post = await this.postRepository.create(
        usuarioId,
        data,
        photoUrlInCloudinary,
      );

      await this.postRepository.associateTagsWithPosts(post.id, data.tags);

      return post;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating post');
    }
  }

  private async uploadFileToCloudinary(
    file?: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      console.error('No file provided');
      return '';
    }
    try {
      const { url } = await this.cloudinaryService.uploadFile(file);
      return url;
    } catch (error) {
      throw new Error('Error uploading file to Cloudinary');
    }
  }
}
