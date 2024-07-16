import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../../../adapters/cloudinary/cloudinary.service';
import { EditPostDto } from '../../application/dto/edit/edit-post.dto';
import { PostRepository } from '../../infrastructure/repositories/post.repository';
import { uploadFileToCloudinary } from '../../infrastructure/update-photo-in-cloudinary';

@Injectable()
export class EditPostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async execute(
    postId: string,
    data: EditPostDto,
    file?: Express.Multer.File,
  ): Promise<any> {
    try {
      const photoUrlInCloudinary = await this.handleFileUpload(postId, file);
      const post = await this.updatePost(postId, data, photoUrlInCloudinary);
      console.log('Post updated successfully', post.tags);
      return post;
    } catch (error) {
      console.error(error);
      throw new Error('Error editing post');
    }
  }

  private async handleFileUpload(
    postId: string,
    file?: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      const existingPost = await this.postRepository.getPhotoByPostId(postId);
      return existingPost?.imagemUrl || '';
    }
    let imageUrl = await uploadFileToCloudinary(this.cloudinaryService, file);
    if (imageUrl.startsWith('http:')) {
      imageUrl = imageUrl.replace('http:', 'https:');
    }
    return imageUrl;
  }

  private async updatePost(
    postId: string,
    data: EditPostDto,
    photoUrl: string,
  ): Promise<any> {
    const post = await this.postRepository.editPostById(postId, data, photoUrl);
    return post;
  }
}
