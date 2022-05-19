import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from '@root/token/domian/service/token.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = this.getTokenFromRequest(context);
    const decodedJwtAccessToken = this.decodeToken(token);
    if (!decodedJwtAccessToken) return false;
    const userId = decodedJwtAccessToken.id;
    return await this.tokenService.ValidateToken(userId);
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
