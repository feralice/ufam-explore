import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/domain/user.service';
import { UserRepository } from '../user/infrastructure/user.repository';
import { ResetPasswordDto } from './dto/forget-password/reset-password.dto';
import { LoginPayload } from './dto/login-payload.dto';
import { LoginResponse } from './dto/login-response.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    this.logger.log(`Tentativa de login para o email: ${email}`);
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      this.logger.warn(`Usuário não encontrado pelo email: ${email}`);
      throw new NotFoundException(
        `Usuário não encontrado pelo email: ${email}`,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);

    if (!isPasswordValid) {
      this.logger.warn(`Senha inválida para o email: ${email}`);
      throw new UnauthorizedException('A senha é inválida');
    }

    const accessToken = this.jwtService.sign({
      ...new LoginPayload(user),
      timestamp: Date.now(),
    });

    this.logger.log(`Login bem-sucedido para o email: ${email}`);

    return {
      accessToken,
      id: user.id,
      perfilId: user.perfilId,
      nome: user.nome,
      email: user.email,
      username: user.username,
      curso: user.curso,
      fotoPerfil: user.fotoPerfil,
    };
  }

  async createPasswordResetToken(email: string): Promise<void> {
    this.logger.log(
      `Criação de token de redefinição de senha para o email: ${email}`,
    );
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      this.logger.warn(`Usuário não encontrado pelo email: ${email}`);
      throw new NotFoundException('Usuário não encontrado.');
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await this.userRepository.updateUserToken(user.id, {
      resetToken,
      resetTokenExpiry,
    });

    await this.emailService.sendResetPasswordEmail(user.email, resetToken);
    this.logger.log(
      `Token de redefinição de senha criado e email enviado para: ${email}`,
    );
  }

  async resetPassword({ token, newPassword }: ResetPasswordDto): Promise<void> {
    this.logger.log(`Redefinição de senha usando o token`);

    const user = await this.userRepository.findUserByResetToken(token);

    if (!user || user.resetTokenExpiry < new Date()) {
      this.logger.warn(
        `Token de redefinição de senha inválido ou expirado: ${token}`,
      );
      throw new UnauthorizedException(
        'Token de redefinição de senha inválido ou expirado.',
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updateUserToken(user.id, {
      senha: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    this.logger.log(
      `Senha redefinida com sucesso para o usuário: ${user.email}`,
    );
  }
}
