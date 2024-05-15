import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID do perfil',
    example: '57a30385-8c86-4cc1-8b1b-83c0d365c3b5',
  })
  perfilId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
    example: 'João da Silva',
  })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Nome de usuário',
    example: 'joaosilva',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Endereço de email do usuário',
    example: 'joao@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    example: 'senha123',
  })
  senha: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Função do usuário',
    example: 'Professor',
  })
  funcao: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'URL da foto de perfil do usuário',
    example: 'https://example.com/profile.jpg',
  })
  foto_de_perfil?: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Descrição do usuário',
    example: 'Sou um aluno do curso de engenharia de software.',
  })
  descricao?: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'CNPJ da empresa',
    example: '12345678901234',
  })
  cnpj?: string;
}
