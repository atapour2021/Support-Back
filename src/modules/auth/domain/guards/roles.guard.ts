import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@root/auth/enums/role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    type NewType = Role;

    const requiredRoles = this.reflector.getAllAndOverride<NewType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const token = context
      .switchToHttp()
      .getRequest()
      .rawHeaders[9].split('Bearer')
      .pop();

    const decodedJwtAccessToken: any = this.jwtService.decode(token);
    if (!decodedJwtAccessToken) return true;
    const userRole = decodedJwtAccessToken.role;

    return requiredRoles.some((role) => userRole === role);
  }
}
