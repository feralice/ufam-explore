import { ProfileRepository } from '@modules/profile/domain/repositories/profile.repository';
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile-request';

@Injectable()
export class CreateProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(profileData: CreateProfileDto) {
    try {
      return this.profileRepository.create(profileData);
    } catch (e) {
      throw new Error(e);
    }
  }
}
