import { Injectable, Logger } from '@nestjs/common';
import { CloudinaryService } from '../../../../adapters/cloudinary/cloudinary.service';
import { EditPostDto } from '../../application/dto/edit/edit-post.dto';
import { PostRepository } from '../../infrastructure/repositories/post.repository';
import { uploadFileToCloudinary } from '../../infrastructure/update-photo-in-cloudinary';

@Injectable()
export class EditPostUseCase {
  private readonly logger = new Logger(EditPostUseCase.name);

  constructor(
    private readonly postRepository: PostRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async execute(
    postId: string,
    data: EditPostDto,
    file?: Express.Multer.File,
  ): Promise<any> {
    this.logger.log(`Starting execution for editing post with ID: ${postId}`);
    try {
      const photoUrlInCloudinary = await this.handleFileUpload(postId, file);
      this.logger.debug(`Photo URL in Cloudinary: ${photoUrlInCloudinary}`);
      const post = await this.updatePost(postId, data, photoUrlInCloudinary);
      this.logger.log(`Successfully edited post with ID: ${postId}`);
      return post;
    } catch (error) {
      this.logger.error(`Error editing post with ID: ${postId}`, error.stack);
      throw new Error('Error editing post');
    }
  }

  private async handleFileUpload(
    postId: string,
    file?: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      this.logger.log(`No file provided for post with ID: ${postId}`);
      const existingPost = await this.postRepository.getPhotoByPostId(postId);
      return existingPost?.imagemUrl || '';
    }
    this.logger.log(`Uploading file for post with ID: ${postId}`);
    let imageUrl = await uploadFileToCloudinary(this.cloudinaryService, file);
    if (imageUrl.startsWith('http:')) {
      imageUrl = imageUrl.replace('http:', 'https:');
      this.logger.debug(`Updated image URL to HTTPS: ${imageUrl}`);
    }
    return imageUrl;
  }

  private async updatePost(
    postId: string,
    data: EditPostDto,
    photoUrl: string,
  ): Promise<any> {
    this.logger.log(`Updating post with ID: ${postId}`);
    const post = await this.postRepository.editPostById(postId, data, photoUrl);
    this.logger.log(`Post with ID: ${postId} updated successfully`);
    return post;
  }
}
