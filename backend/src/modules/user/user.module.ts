import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from '../../adapters/cloudinary/cloudinary.module';
import { UserController } from './application/user.controller';
import { UserService } from './domain/user.service';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  imports: [JwtModule, CloudinaryModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
