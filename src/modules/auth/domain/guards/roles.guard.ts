import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@root/auth/enums/role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    type NewType = Role;

    const requiredRoles = this.reflector.getAllAndOverride<NewType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const token = this.getTokenFromRequest(context);
    const decodedJwtAccessToken = this.decodeToken(token);
    if (!decodedJwtAccessToken) return false;
    const userRole = decodedJwtAccessToken.role;

    return requiredRoles.some((role) => userRole === role);
  }

  getTokenFromRequest(context: ExecutionContext): string {
    let token: string;
    const rawHeaders = Array.from(
      context.switchToHttp().getRequest().rawHeaders,
    );
    for (let index = 0; index < rawHeaders.length; index++) {
      const element: any = rawHeaders[index];
      if (element.includes('Bearer')) token = element.split('Bearer').pop();
    }
    return token;
  }
  decodeToken(token: string): JwtPayload {
    const base64Payload = token.split('.')[1];
    if (!base64Payload) return undefined;
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload: JwtPayload = JSON.parse(
      payloadBuffer.toString(),
    ) as JwtPayload;
    return updatedJwtPayload;
  }
}
