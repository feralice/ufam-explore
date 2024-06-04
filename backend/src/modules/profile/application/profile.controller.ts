import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile-request';
import { CreateProfileResponse } from './dto/create-profile-response';
import { CreateProfileService } from './use-cases/create-profile.service';
import { GetAllProfilesService } from './use-cases/find-all.service';

@ApiBearerAuth()
@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(
    private readonly createProfile: CreateProfileService,
    private readonly getAllProfiles: GetAllProfilesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo perfil' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Perfil criado com sucesso',
    type: CreateProfileResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Sem autorização para criar um perfil',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro ao criar um perfil',
    type: InternalServerErrorException,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Perfil já existe',
    type: ConflictException,
  })
  create(
    @Body() createProfile: CreateProfileDto,
  ): Promise<CreateProfileResponse> {
    return this.createProfile.execute(createProfile);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os perfis' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateProfileResponse,
  })
  findAll(): Promise<CreateProfileResponse[]> {
    return this.getAllProfiles.execute();
  }
}
