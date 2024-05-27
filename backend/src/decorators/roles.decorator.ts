import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/modules/user/enum/user.-types.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
