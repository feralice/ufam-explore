import { ConflictException, Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(nome: string) {
    try {
      const tag = await this.tagRepository.findByName(nome);
      if (tag) {
        throw new ConflictException('Tag já existe');
      }
      return this.tagRepository.create(nome);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return this.tagRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByName(nome: string) {
    try {
      return this.tagRepository.findByName(nome);
    } catch (error) {
      throw new Error(error);
    }
  }
}
