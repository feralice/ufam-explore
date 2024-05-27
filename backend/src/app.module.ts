import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from './adapters/cloudinary/cloudinary.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { PostModule } from './modules/post/post.module';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileModule } from './modules/profile/profile.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { VotesModule } from './modules/votes/votes.module';

@Module({
  controllers: [ProfileController],
  imports: [
    UserModule,
    ProfileModule,
    PrismaModule,
    AuthModule,
    JwtModule,
    PostModule,
    TagModule,
    EventModule,
    CloudinaryModule,
    VotesModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
