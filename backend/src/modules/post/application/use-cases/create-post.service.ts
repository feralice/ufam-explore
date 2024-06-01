import { CloudinaryService } from '@adapters/cloudinary/cloudinary.service';
import { CreatePostDto } from '@modules/post/application/dto/create/create-post.-request.dto';
import { PostRepository } from '@modules/post/domain/repositories/post.repository';
import { uploadFileToCloudinary } from '@modules/post/infrastructure/update-photo-in-cloudinary';
import { TagRepository } from '@modules/tag/tag.repository';
import { Injectable } from '@nestjs/common';
import { CreatePostResponse } from '@modules/post/application/dto/create/create-post-response.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(
    usuarioId: string,
    data: CreatePostDto,
    file?: Express.Multer.File,
  ): Promise<CreatePostResponse> {
    try {
      const photoUrlInCloudinary = await uploadFileToCloudinary(
        this.cloudinaryService,
        file,
      );
      const post = await this.postRepository.create(
        usuarioId,
        data,
        photoUrlInCloudinary,
      );

      await this.associateTagsWithPost(post.id, data.tags);

      return post;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating post');
    }
  }

  private async associateTagsWithPost(postId: string, tags: string[]) {
    const tagsIds = await this.tagRepository.findIdsByName(tags);
    await this.postRepository.associateTagsWithPosts(
      postId,
      tagsIds.map((tag) => tag.id),
    );
  }
}
