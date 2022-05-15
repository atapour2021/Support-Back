import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@root/auth/application/auth.dto';
import { UserDto } from '@root/user/application/dto/user.dto';
import { User } from '@root/user/domain/schema/user.schema';
import { UserService } from '@root/user/domain/service/user.service';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from 'src/shared/result-model/base-result-model';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  result = new BaseResponse();

  constructor(
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(body: LoginDto): Promise<BaseResponse<any>> {
    const users = await this.userService.findAll();
    const user = users.data.find(
      (u) => u.userName === body.userName && u.password === body.password,
    );

    if (user) {
      const token = await this.authRepository.getToken(user);
      await this.authRepository.updateRefreshTokenInUser(token, user._id);

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

  async getNewToken(user: UserDto): Promise<BaseResponse<any>> {
    const token: string = await this.authRepository.getToken(user);
    await this.authRepository.updateRefreshTokenInUser(token, user._id);
    this.result.init({
      data: token,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async signOut(userId: string): Promise<BaseResponse<any>> {
    return await this.authRepository.updateRefreshTokenInUser(null, userId);
  }

  async register(body: RegisterDto): Promise<BaseResponse<any>> {
    const alreadyUser = await this.authRepository.checkAlreadyUser(body);
    if (!alreadyUser) {
      const profile = await this.authRepository.createProfile(body);
      const user = await this.authRepository.createUser(profile, body);
      await this.authRepository.createNotification(user);

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

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      const users = await this.userService.findAll();
      user = users.data.find((u) => u.id === payload.id);
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
    delete user.password;

    return user;
  }
}
