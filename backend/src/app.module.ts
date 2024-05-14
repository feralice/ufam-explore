import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [ProfileController],
  imports: [UserModule, ProfileModule, PrismaModule],
})
export class AppModule {}
