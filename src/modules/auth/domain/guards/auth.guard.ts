import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@root/token/domian/service/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.rawHeaders[9].split('Bearer').pop();
    const decodedJwtAccessToken: any = this.jwtService.decode(token);
    if (!decodedJwtAccessToken) return true;
    const userId = decodedJwtAccessToken._id;
    return await this.tokenService.ValidateToken(userId);
  }
}
