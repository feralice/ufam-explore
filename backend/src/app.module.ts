import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './config/prisma/prisma.module';
import { RolesGuard } from './guard/roles.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileModule } from './modules/profile/profile.module';
import { UserModule } from './modules/user/user.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  controllers: [ProfileController],
  imports: [UserModule, ProfileModule, PrismaModule, AuthModule, JwtModule],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
