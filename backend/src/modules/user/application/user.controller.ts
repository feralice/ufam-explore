import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Usuario } from '@prisma/client';
import { Public } from '../../../common/decorators/auth.decorator';
import { UserService } from '../domain/user.service';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<Usuario> {
    return this.userService.create(createUserDto);
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user with the specified ID',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  getUserById(@Param('userId') userId: string): Promise<Usuario> {
    return this.userService.getUserById(userId);
  }

  @Patch('/update/:userId')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Usuario> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Get('/by-email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user with the specified email',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  getUserByEmail(@Param('email') email: string): Promise<Usuario> {
    return this.userService.getUserByEmail(email);
  }

  @Post('/delete/:userId')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async deleteUser(@Param('userId') userId: string) {
    try {
      const result = await this.userService.deleteUser(userId);
      return { message: result }; // Retorna um objeto com a mensagem
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
