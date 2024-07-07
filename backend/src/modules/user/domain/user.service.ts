import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { CloudinaryService } from '../../../adapters/cloudinary/cloudinary.service';
import { encryptPassword } from '../../../common/utils/encrypted-password';
import { uploadFileToCloudinary } from '../../../modules/post/infrastructure/update-photo-in-cloudinary';
import { CreateUserDto } from '../application/dto/create/create-user.dto';
import { UpdateUserDto } from '../application/dto/update/update-user.dto';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;
    this.logger.log(
      `Creating user with email: ${email} and username: ${username}`,
    );

    const existingUserByEmail = await this.userRepository.getUserByEmail(email);
    if (existingUserByEmail) {
      this.logger.warn(`Conflict: User already exists with email: ${email}`);
      throw new ConflictException(
        `Usuário já cadastrado com o email: ${email}`,
      );
    }

    const existingUserByUsername =
      await this.userRepository.getUserByUsername(username);
    if (existingUserByUsername) {
      this.logger.warn(
        `Conflict: User already exists with username: ${username}`,
      );
      throw new ConflictException(
        `Usuário já cadastrado com o username: ${username}`,
      );
    }

    const hashedPassword = await encryptPassword(createUserDto.senha);
    const newUserDto: CreateUserDto = {
      ...createUserDto,
      senha: hashedPassword,
    };
    const user = await this.userRepository.create(newUserDto);
    this.logger.log(`User created with ID: ${user.id}`);
    return user;
  }

  async getUserById(id: string): Promise<Usuario> {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      this.logger.error(`User not found with ID: ${id}`);
      throw new NotFoundException(`User not found with ID: ${id}`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    this.logger.log(`Updating user with ID: ${id}`);
    let secureUrl = null;
    if (file) {
      const photoUrlInCloudinary = await uploadFileToCloudinary(
        this.cloudinaryService,
        file,
      );
      secureUrl = photoUrlInCloudinary.replace('http', 'https');
      this.logger.log(
        `File uploaded to Cloudinary with secure URL: ${secureUrl}`,
      );
    }

    const verifyIfEmailExists = await this.userRepository.getUserByEmail(
      updateUserDto.email,
    );

    if (verifyIfEmailExists && verifyIfEmailExists.id !== id) {
      this.logger.warn(
        `Conflict: Email already in use: ${updateUserDto.email}`,
      );
      throw new ConflictException(
        `Usuário já cadastrado com o email: ${updateUserDto.email}`,
      );
    }

    const verifyIfUsernameExists = await this.userRepository.getUserByUsername(
      updateUserDto.username,
    );

    if (verifyIfUsernameExists && verifyIfUsernameExists.id !== id) {
      this.logger.warn(
        `Conflict: Username already in use: ${updateUserDto.username}`,
      );
      throw new ConflictException(
        `Usuário já cadastrado com o username: ${updateUserDto.username}`,
      );
    }

    const updatedUser = await this.userRepository.updateUser(
      id,
      updateUserDto,
      secureUrl,
    );
    this.logger.log(`User with ID: ${id} updated successfully`);
    return updatedUser;
  }

  async getUserByEmail(email: string): Promise<Usuario> {
    this.logger.log(`Fetching user with email: ${email}`);
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      this.logger.error(`User not found with email: ${email}`);
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    return user;
  }

  async deleteUser(id: string) {
    this.logger.log(`Deleting user with ID: ${id}`);
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      this.logger.error(`User not found with ID: ${id}`);
      throw new NotFoundException(`User not found with ID: ${id}`);
    }

    await this.userRepository.deleteUser(id);
    this.logger.log(`User with ID ${id} deleted successfully`);
    return `User with ID ${id} deleted successfully`;
  }
}
