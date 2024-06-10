import { Module } from '@nestjs/common';
import { ProfileController } from './application/profile.controller';
import { CreateProfileService } from './domain/use-cases/create-profile.service';
import { GetAllProfilesService } from './domain/use-cases/find-all.service';
import { ProfileRepository } from './infrastructure/repositories/profile.repository';

@Module({
  controllers: [ProfileController],
  providers: [CreateProfileService, GetAllProfilesService, ProfileRepository],
  exports: [GetAllProfilesService, CreateProfileService, ProfileRepository],
})
export class ProfileModule {}
