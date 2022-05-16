import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@root/auth/application/auth.dto';
import { Role } from '@root/auth/enums/role.enum';
import { NotificationService } from '@root/notification/domain/service/Notification.service';
import { ProfileDto } from '@root/Profile/application/dto/Profile.dto';
import { ProfileService } from '@root/profile/domain/service/Profile.service';
import { UserDto } from '@root/user/application/dto/user.dto';
import { User } from '@root/user/domain/schema/user.schema';
import { UserService } from '@root/user/domain/service/user.service';
import { AppConfig } from '@shared/config/app.config';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from '@shared/result-model/base-result-model';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthRepository {
  result = new BaseResponse();

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly notificationService: NotificationService,
  ) {}

  async getToken(user: UserDto): Promise<string> {
    const userRole: Role = user.userRole;
    const defaultRole: Role = Role.User;
    let payload: JwtPayload;

    if (!userRole)
      payload = {
        id: user._id,
        profileId: user.profileId,
        role: defaultRole,
      };
    else payload = { id: user._id, profileId: user.profileId, role: userRole };
    const accessToken = await this.jwtService.sign(payload, {
      secret: AppConfig.SecretKey,
      expiresIn: +AppConfig.ExpiresIn,
    });
    return accessToken;
  }

  async updateRefreshTokenInUser(
    newToken: string,
    id: string,
  ): Promise<BaseResponse<UserDto>> {
    if (newToken) {
      newToken = await bcrypt.hash(newToken, 10);
    }

    const user: BaseResponse<UserDto> = await this.userService.findOne(id);
    user.data.hashedRefreshToken = newToken;
    return await this.userService.update(id, user.data);
  }

  async checkAlreadyUser(body: RegisterDto): Promise<boolean> {
    if (!body.userRole) body.userRole = Role.User;
    const users = await this.userService.findAll();
    const alreadyUser = users.data.find(
      (u) =>
        u.userName === body.userName || u.nationalCode === body.nationalCode,
    );

    return alreadyUser;
  }

  async createProfile(body: RegisterDto): Promise<ProfileDto> {
    const profileData: any = {
      userName: body.userName,
      nationalCode: body.nationalCode,
      fullName: body.fullName,
      userRole: body.userRole,
    };
    const profile = await this.profileService.create(profileData);

    return profile;
  }

  async createUser(profile, body: RegisterDto): Promise<User> {
    const userData: any = {
      profileId: profile._id,
      userName: body.userName,
      password: body.password,
      nationalCode: body.nationalCode,
      fullName: body.fullName,
      userRole: body.userRole,
    };
    const user = await this.userService.create(userData);

    return user.data;
  }

  async createNotification(user: any): Promise<BaseResponse<any>> {
    const notification: any = {
      title: persian.SystemNotification,
      description: `${user.fullName} ${persian.Registered}`,
      createDate: Date.now().toString(),
      creator: user.fullName,
      isVisited: false,
      userId: user._id,
    };

    return await this.notificationService.create(notification);
  }
}
