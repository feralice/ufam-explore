import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../../application/dto/create-profile-request';
import { ProfileRepository } from '../../infrastructure/repositories/profile.repository';

@Injectable()
export class CreateProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(profileData: CreateProfileDto) {
    try {
      return this.profileRepository.create(profileData);
    } catch (error) {
      throw new Error(error);
    }
  }
}
