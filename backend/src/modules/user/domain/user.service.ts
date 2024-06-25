import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { encryptPassword } from '../../../common/utils/encrypted-password';
import { CreateUserDto } from '../application/dto/create/create-user.dto';
import { UpdateUserDto } from '../application/dto/update/update-user.dto';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    const existingUserByEmail = await this.userRepository.getUserByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException(
        `Usuário já cadastrado com o email: ${email}`,
      );
    }

    const existingUserByUsername =
      await this.userRepository.getUserByUsername(username);
    if (existingUserByUsername) {
      throw new ConflictException(
        `Usuário já cadastrado com o username: ${username}`,
      );
    }

    const hashedPassword = await encryptPassword(createUserDto.senha);
    const newUserDto: CreateUserDto = {
      ...createUserDto,
      senha: hashedPassword,
    };
    return this.userRepository.create(newUserDto);
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

  async deleteUser(id: string) {
    try {
      const deletedUser = this.userRepository.deleteUser(id);

      if (!deletedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return `User with ID ${id} deleted successfully`;
    } catch (e) {
      throw new Error(e);
    }
  }
}
