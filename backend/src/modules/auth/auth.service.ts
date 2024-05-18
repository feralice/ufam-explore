import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { checkPasswordMatch } from 'src/utils/check-password-match';
import { UserService } from '../user/user.service';
import { LoginPayload } from './dto/login-payload.dto';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(email);

    

    if (!user) {
      throw new NotFoundException(
        `Usuário não encontrado pelo email: ${email}`,
      );
    }

    const isPasswordValid = await checkPasswordMatch(password, user.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedException('A senha é inválida');
    }

    const accessToken = this.jwtService.sign({ ...new LoginPayload(user) });

    return {
      accessToken,
      id: user.id,
      perfilId: user.perfilId,
      nome: user.nome,
      email: user.email,
    };
  }
}
