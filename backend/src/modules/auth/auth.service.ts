import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkPasswordMatch } from '../../common/utils/check-password-match';
import { UserService } from '../user/domain/user.service';
import { LoginPayload } from './dto/login-payload.dto';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
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

    const accessToken = this.jwtService.sign({
      ...new LoginPayload(user),
      timestamp: Date.now(),
    });

    return {
      accessToken,
      id: user.id,
      perfilId: user.perfilId,
      nome: user.nome,
      email: user.email,
      username: user.username,
      curso: user.curso,
    };
  }
}
