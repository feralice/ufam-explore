import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SavePostRepository } from '../../infrastructure/save.repository';

@Injectable()
export class SavePostService {
  private readonly logger = new Logger(SavePostService.name);

  constructor(private savePostRepository: SavePostRepository) {}

  async saveOrUnsavePost(usuarioId: string, postagemId: string) {
    try {
      const existingSave = await this.savePostRepository.findSave(
        usuarioId,
        postagemId,
      );


      if (existingSave) {
        const result = await this.savePostRepository.deleteSave(
          usuarioId,
          postagemId,
        );
        this.logger.log(
          `Successfully unsaved post with ID ${postagemId} for user ${usuarioId}`,
        );
        return result;
      }

      const result = await this.savePostRepository.savePost(
        usuarioId,
        postagemId,
      );
      this.logger.log(
        `Successfully saved post with ID ${postagemId} for user ${usuarioId}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to save or unsave post with ID ${postagemId} for user ${usuarioId}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to save or unsave post');
    }
  }
}
