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
    await this.validateUserExists(usuarioId);

    const photoUrlInCloudinary = file
      ? await uploadFileToCloudinary(this.cloudinaryService, file)
      : null;

    const allTags = await this.processTags(data.tags);

    const post = await this.postRepository.create(
      usuarioId,
      data,
      photoUrlInCloudinary,
    );

    if (allTags.length > 0) {
      await this.associateTagsWithPost(
        post.id,
        allTags.map((tag) => tag.nome),
      );
    }

    return post;
  }

  private async validateUserExists(usuarioId: string): Promise<void> {
    const userExists = await this.userRepository.getUserById(usuarioId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${usuarioId} not found`);
    }
  }

  private async processTags(tags?: string[]): Promise<any[]> {
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return [];
    }

    const existingTags = await this.tagRepository.findByNames(tags);
    const existingTagNames = existingTags.map((tag) => tag.nome);
    const nonExistingTags = tags.filter(
      (tag) => !existingTagNames.includes(tag),
    );

    const createdTags =
      nonExistingTags.length > 0
        ? await this.tagRepository.createMany(nonExistingTags)
        : [];

    return [...existingTags, ...createdTags];
  }

  private async associateTagsWithPost(postId: string, tagNames: string[]) {
    const tagsIds = await this.tagRepository.findIdsByName(tagNames);
    await this.postRepository.associateTagsWithPosts(
      postId,
      tagsIds.map((tag) => tag.id),
    );
  }
}
