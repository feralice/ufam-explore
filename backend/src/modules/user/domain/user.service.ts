import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { CloudinaryService } from 'src/adapters/cloudinary/cloudinary.service';
import { uploadFileToCloudinary } from 'src/modules/post/infrastructure/update-photo-in-cloudinary';
import { encryptPassword } from '../../../common/utils/encrypted-password';
import { CreateUserDto } from '../application/dto/create/create-user.dto';
import { UpdateUserDto } from '../application/dto/update/update-user.dto';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    let secureUrl = null;
    if (file) {
      const photoUrlInCloudinary = await uploadFileToCloudinary(
        this.cloudinaryService,
        file,
      );
      secureUrl = photoUrlInCloudinary.replace('http', 'https');
    }

    const verifyIfEmailExists = await this.userRepository.getUserByEmail(
      updateUserDto.email,
    );

    if (verifyIfEmailExists && verifyIfEmailExists.id !== id) {
      throw new ConflictException(
        `Usuário já cadastrado com o email: ${updateUserDto.email}`,
      );
    }

    const verifyIfUsernameExists = await this.userRepository.getUserByUsername(
      updateUserDto.username,
    );

    if (verifyIfUsernameExists && verifyIfUsernameExists.id !== id) {
      throw new ConflictException(
        `Usuário já cadastrado com o username: ${updateUserDto.username}`,
      );
    }

    return await this.userRepository.updateUser(id, updateUserDto, secureUrl);
  }

  async getUserByEmail(email: string): Promise<Usuario> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${id}`);
    }

    await this.userRepository.deleteUser(id);
    return `User with ID ${id} deleted successfully`;
  }
}
