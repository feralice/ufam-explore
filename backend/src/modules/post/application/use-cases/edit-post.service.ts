import { CloudinaryService } from '@adapters/cloudinary/cloudinary.service';
import { PostRepository } from '@modules/post/domain/repositories/post.repository';
import { uploadFileToCloudinary } from '@modules/post/infrastructure/update-photo-in-cloudinary';
import { EditPostDto } from '../dto/edit/edit-post.dto';
import { Injectable } from '@nestjs/common';

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
    console.log(data);

    try {
      const photoUrlInCloudinary = await uploadFileToCloudinary(
        this.cloudinaryService,
        file,
      );
      console.log(photoUrlInCloudinary);

      const post = await this.postRepository.editPostById(
        postId,
        data,
        photoUrlInCloudinary,
      );

      await this.postRepository.associateTagsWithPosts(post.id, data.tags);

      return post;
    } catch (error) {
      console.error(error);
      throw new Error('Error editing post');
    }
  }
}
