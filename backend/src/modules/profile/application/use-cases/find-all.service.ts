import { ProfileRepository } from '@modules/profile/domain/repositories/profile.repository';
import { Injectable } from '@nestjs/common';

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
