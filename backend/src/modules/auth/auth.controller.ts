import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forget-password/forget-password.dto';
import { ResetPasswordDto } from './dto/forget-password/reset-password.dto';
import { LoginResponse } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller()
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  @ApiOperation({ summary: 'Login' })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Esqueci minha senha' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.createPasswordResetToken(forgotPasswordDto.email);
    return { message: 'Email de redefinição de senha enviado.' };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Redefinir senha' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);
    return { message: 'Senha redefinida com sucesso.' };
  }
}
