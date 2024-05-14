import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile';
import { ProfileRepository } from './repository/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async create(profileData: CreateProfileDto) {
    return this.profileRepository.create(profileData);
  }

  async findAll() {
    return this.profileRepository.findAll();
  }
}
