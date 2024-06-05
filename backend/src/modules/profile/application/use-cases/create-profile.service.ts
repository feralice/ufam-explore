import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../../domain/repositories/profile.repository';
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
