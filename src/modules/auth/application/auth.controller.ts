import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@root/user/application/dto/user.dto';
import { UserService } from '@root/user/domain/service/user.service';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { JWTAuthGuard } from '../domain/guards/jwt-auth.guard';
import { AuthService } from '../domain/service/auth.service';
import { LoginDto, LogoutDto, RefreshTokenDto, RegisterDto } from './auth.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<BaseResponse<any>> {
    return await this.authService.login(body);
  }

  @Post('register')
  async loregistergin(@Body() body: RegisterDto): Promise<BaseResponse<any>> {
    return await this.authService.register(body);
  }

  @Post('/logout')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async logout(@Body() body: LogoutDto) {
    const user: BaseResponse<UserDto> = await this.userService.findOne(
      body.userId,
    );
    return this.authService.signOut(user.data);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    const user: BaseResponse<UserDto> = await this.userService.findOne(
      body.userId,
    );
    return this.authService.getNewToken(user.data);
  }
}
