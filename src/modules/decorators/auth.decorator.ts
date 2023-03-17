import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleEnum } from 'modules/decorators/RoleEnum';
import { RoleGuard } from '@/strategy/role.guard';

export function Auth(...roles: RoleEnum[]) {
  console.log(roles);
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard('jwt'), RoleGuard)
  );
}
