import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from './adapters/cloudinary/cloudinary.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comment/comment.module';
import { EventModule } from './modules/event/event.module';
import { PostModule } from './modules/post/post.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SaveModule } from './modules/save/save.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { VotesModule } from './modules/votes/votes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [],
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
    SaveModule,
    CommentsModule,
  ],
  //providers: [
  //{ provide: APP_GUARD, useClass: RolesGuard },
  //TODO: Desfazer isso aqui quando o login e cadastro estiverem prontos
  //{
  //provide: APP_GUARD,
  //useClass: AuthGuard,
  //},
  // ],
})
export class AppModule {}
