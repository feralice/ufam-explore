import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from '../../../../adapters/cloudinary/cloudinary.service';
import { UserRepository } from '../../../../modules/user/infrastructure/user.repository';
import { TagRepository } from '../../../tag/infrastructure/tag.repository';
import { CreatePostResponse } from '../../application/dto/create/create-post-response.dto';
import { CreatePostDto } from '../../application/dto/create/create-post.-request.dto';
import { PostRepository } from '../../infrastructure/repositories/post.repository';
import { uploadFileToCloudinary } from '../../infrastructure/update-photo-in-cloudinary';

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

    let secureUrl = null;
    if (file) {
      const photoUrlInCloudinary = await uploadFileToCloudinary(
        this.cloudinaryService,
        file,
      );
      secureUrl = photoUrlInCloudinary.replace('http', 'https');
      console.log(`Uploaded photo to Cloudinary. Secure URL: ${secureUrl}`);
    }

    const allTags = await this.processTags(data.tags);

    const post = await this.postRepository.create(usuarioId, data, secureUrl);

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
