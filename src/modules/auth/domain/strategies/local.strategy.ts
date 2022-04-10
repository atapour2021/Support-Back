import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LoginDto } from '@root/auth/application/auth.dto';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  validate(user: LoginDto): Promise<any> {
    return this.authService.login(user);
  }
}
