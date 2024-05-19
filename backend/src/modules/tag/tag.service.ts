import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(nome: string) {
    try {
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
}
