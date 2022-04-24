import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from '@root/auth/application/auth.dto';
import { Role } from '@root/auth/enums/role.enum';
import { User } from '@root/user/domain/schema/user.schema';
import { UserService } from '@root/user/domain/service/user.service';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from 'src/shared/result-model/base-result-model';

@Injectable()
export class AuthService {
  result = new BaseResponse();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<BaseResponse<any>> {
    const users = await this.userService.findAll();
    const user = users.find(
      (u) => u.userName === body.userName && u.password === body.password,
    );

    if (user) {
      const userRole: Role = user.userRole;
      const defaultRole: Role = Role.User;
      let payload: any;

      if (!userRole)
        payload = { id: user._id, fullName: user.fullName, role: defaultRole };
      else payload = { id: user._id, fullName: user.fullName, role: userRole };
      const token = this.jwtService.sign(payload);
      this.result.init({
        data: token,
        success: true,
        successMassage: undefined,
        errorMassage: undefined,
      });

      return this.result;
    } else {
      this.result.init({
        data: null,
        success: false,
        successMassage: undefined,
        errorMassage: persian.LoginUserNotFoundErrorMassage,
      });

      return this.result;
    }
  }

  async register(body: RegisterDto): Promise<BaseResponse<any>> {
    const users = await this.userService.findAll();
    if (!body.userRole) body.userRole = Role.User;
    const user = await this.userService.create(body);
    const alreadyUser = users.find(
      (u) =>
        u.userName === user.userName || u.nationalCode === user.nationalCode,
    );

    if (!alreadyUser) {
      this.result.init({
        data: user,
        success: true,
        successMassage: persian.RegisterSuccessfully,
        errorMassage: undefined,
      });

      return this.result;
    } else {
      this.result.init({
        data: null,
        success: false,
        successMassage: undefined,
        errorMassage: persian.TheUserHasAlreadyRegisteredWithThisProfile,
      });

      return this.result;
    }
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
