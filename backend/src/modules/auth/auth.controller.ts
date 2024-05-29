import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  @ApiOperation({ summary: 'Login' })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Get('hello')
  @Public()
  getHello() {
    return 'Hello';
  }
}
