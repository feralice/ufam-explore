import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfile: CreateProfileDto) {
    return this.profileService.create(createProfile);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }
}
