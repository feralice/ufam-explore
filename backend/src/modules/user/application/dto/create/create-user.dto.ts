import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'ID do perfil',
    example: 1,
  })
  perfilId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
    example: 'João da Silva',
  })
  nome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Nome de usuário',
    example: 'joaosilva',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Endereço de email do usuário',
    example: 'joao@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    example: 'senha123',
  })
  senha: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Função do usuário',
    example: 'Professor',
  })
  funcao: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'URL da foto de perfil do usuário',
    example: 'https://example.com/profile.jpg',
  })
  fotoPerfil?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Biografia do usuário',
    example: 'Sou um aluno do curso de engenharia de software.',
  })
  biografia?: string;
}
