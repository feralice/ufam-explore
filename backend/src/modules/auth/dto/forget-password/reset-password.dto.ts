import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token de redefinição de senha',
    example: 'token-recebido-no-email',
  })
  token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'novasenha123',
  })
  newPassword: string;
}
