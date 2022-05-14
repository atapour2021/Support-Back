import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from '@root/auth/application/auth.dto';
import { Role } from '@root/auth/enums/role.enum';
import { NotificationService } from '@root/notification/domain/service/Notification.service';
import { Profile } from '@root/profile/domain/schema/Profile.schema';
import { ProfileService } from '@root/profile/domain/service/Profile.service';
import { User } from '@root/user/domain/schema/user.schema';
import { UserService } from '@root/user/domain/service/user.service';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from 'src/shared/result-model/base-result-model';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  result = new BaseResponse();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private profileService: ProfileService,
    private notificationService: NotificationService,
  ) {}

  async login(body: LoginDto): Promise<BaseResponse<any>> {
    const users = await this.userService.findAll();
    const user = users.data.find(
      (u) => u.userName === body.userName && u.password === body.password,
    );

    if (user) {
      const userRole: Role = user.userRole;
      const defaultRole: Role = Role.User;
      let payload: JwtPayload;

      if (!userRole)
        payload = {
          id: user._id,
          profileId: user.profileId,
          role: defaultRole,
        };
      else
        payload = { id: user._id, profileId: user.profileId, role: userRole };
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
    const alreadyUser = await this.checkAlreadyUser(body);
    if (!alreadyUser) {
      const profile = await this.createProfile(body);
      const user = await this.createUser(profile, body);
      await this.createNotification(user);

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
  async checkAlreadyUser(body: RegisterDto): Promise<boolean> {
    if (!body.userRole) body.userRole = Role.User;
    const users = await this.userService.findAll();
    const alreadyUser = users.data.find(
      (u) =>
        u.userName === body.userName || u.nationalCode === body.nationalCode,
    );

    return alreadyUser;
  }
  async createProfile(body: RegisterDto): Promise<Profile> {
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
