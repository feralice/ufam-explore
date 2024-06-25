import { Injectable, NotFoundException } from '@nestjs/common';
import { SavePostRepository } from '../../infrastructure/save.repository';

@Injectable()
export class GetSavePostsByUser {
  constructor(private readonly saveRepository: SavePostRepository) {}

  async getSavedPostsByUser(usuarioId: string) {
    try {
      const savedPosts =
        await this.saveRepository.getSavedPostsByUser(usuarioId);
      return savedPosts;
    } catch (error) {
      throw new NotFoundException(
        `Failed to retrieve saved posts for user with ID ${usuarioId}`,
      );
    }
  }
}
