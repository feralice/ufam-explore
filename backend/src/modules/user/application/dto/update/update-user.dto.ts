import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
    example: 'João da Silva',
  })
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Nome de usuário',
    example: 'joaosilva',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Endereço de email do usuário',
    example: 'joao@example.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    example: 'senha123',
  })
  senha?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Função do usuário',
    example: 'Professor',
  })
  funcao?: string;

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

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'CNPJ da empresa',
    example: '12345678901234',
  })
  cnpj?: string;
}