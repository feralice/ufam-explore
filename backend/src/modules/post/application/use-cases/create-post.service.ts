import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from '../../../../adapters/cloudinary/cloudinary.service';
import { TagRepository } from '../../../../modules/tag/domain/tag.repository';
import { UserRepository } from '../../../../modules/user/user.repository';
import { PostRepository } from '../../domain/repositories/post.repository';
import { uploadFileToCloudinary } from '../../infrastructure/update-photo-in-cloudinary';
import { CreatePostResponse } from '../dto/create/create-post-response.dto';
import { CreatePostDto } from '../dto/create/create-post.-request.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tagRepository: TagRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(
    usuarioId: string,
    data: CreatePostDto,
    file?: Express.Multer.File,
  ): Promise<CreatePostResponse> {
    try {
      const userExists = await this.userRepository.getUserById(usuarioId);
      if (!userExists) {
        throw new NotFoundException(`User with ID ${usuarioId} not found`);
      }

      const photoUrlInCloudinary = await uploadFileToCloudinary(
        this.cloudinaryService,
        file,
      );

      const existingTags = await this.tagRepository.findByNames(data.tags);
      const existingTagNames = existingTags.map((tag) => tag.nome);
      const nonExistingTags = data.tags.filter(
        (tag) => !existingTagNames.includes(tag),
      );

      let createdTags = [];
      if (nonExistingTags.length > 0) {
        createdTags = await this.tagRepository.createMany(nonExistingTags);
      }

      const allTags = [...existingTags, ...createdTags];

      const post = await this.postRepository.create(
        usuarioId,
        data,
        photoUrlInCloudinary,
      );

      await this.associateTagsWithPost(
        post.id,
        allTags.map((tag) => tag.nome),
      );

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
