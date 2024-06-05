import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../../domain/repositories/profile.repository';

@Injectable()
export class GetAllProfilesService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute() {
    try {
      return this.profileRepository.findAll();
    } catch (e) {
      throw new Error(e);
    }
  }
}
