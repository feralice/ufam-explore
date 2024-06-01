import { ProfileController } from '@modules/profile/application/profile.controller';
import { CreateProfileService } from '@modules/profile/application/use-cases/create-profile.service';
import { GetAllProfilesService } from '@modules/profile/application/use-cases/find-all.service';
import { ProfileRepository } from '@modules/profile/domain/repositories/profile.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ProfileController],
  providers: [CreateProfileService, GetAllProfilesService, ProfileRepository],
  exports: [GetAllProfilesService, CreateProfileService, ProfileRepository],
})
export class ProfileModule {}
