import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile-request';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async create(profileData: CreateProfileDto) {
    try {
      return this.profileRepository.create(profileData);
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll() {
    try {
      return this.profileRepository.findAll();
    } catch (e) {
      throw new Error(e);
    }
  }
}
