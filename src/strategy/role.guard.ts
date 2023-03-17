import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { user } from '@prisma/client';
import { RoleEnum } from 'modules/decorators/RoleEnum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as user;
    // @ts-ignore
    const role = this.reflector.getAllAndMerge<RoleEnum>('roles', [
      context.getHandler(),
      context.getClass()
    ]) as string[];
    console.log(user);
    console.log(role);
    /* 添加并验证权限 */
    if (role) {
      return role.some((node) => node === user.auth);
    }
    return false;
  }
}
