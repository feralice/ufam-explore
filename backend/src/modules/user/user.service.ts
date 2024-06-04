import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { encryptPassword } from '../../common/utils/encrypted-password';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await encryptPassword(createUserDto.senha);
      const newUserDto: CreateUserDto = {
        ...createUserDto,
        senha: hashedPassword,
      };
      return this.userRepository.create(newUserDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserById(id: string): Promise<Usuario> {
    try {
      return this.userRepository.getUserById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.updateUser(id, updateUserDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserByEmail(email: string): Promise<Usuario> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    return user;
  }
}
