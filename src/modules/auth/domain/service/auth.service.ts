import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from '@root/auth/application/auth.dto';
import { User } from '@root/user/domain/schema/user.schema';
import { UserService } from '@root/user/domain/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const users = await this.userService.findAll();
    const user = users.find(
      (u) => u.userName === body.userName && u.password === body.password,
    );

    if (user) {
      const payload = { id: user._id };
      return {
        access_token: this.jwtService.sign(payload),
        success: true,
        text: 'success',
      };
    } else {
      throw new HttpException('inValid user', 201);
    }
  }

  async register(body: RegisterDto) {
    return this.userService.create(body);
  }

  async verifyPayload(payload: any): Promise<User> {
    let user: User;

    try {
      const users = await this.userService.findAll();
      user = users.find((u) => u.id === payload.id);
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
    delete user.password;

    return user;
  }
}
