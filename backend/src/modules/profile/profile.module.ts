import { Module } from '@nestjs/common';
import { ProfileController } from './application/profile.controller';
import { CreateProfileService } from './application/use-cases/create-profile.service';
import { GetAllProfilesService } from './application/use-cases/find-all.service';
import { ProfileRepository } from './domain/repositories/profile.repository';

@Module({
  controllers: [ProfileController],
  providers: [CreateProfileService, GetAllProfilesService, ProfileRepository],
  exports: [GetAllProfilesService, CreateProfileService, ProfileRepository],
})
export class ProfileModule {}
