import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@root/user/application/dto/user.dto';
import { UserService } from '@root/user/domain/service/user.service';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { AuthGuard } from '../domain/guards/auth.guard';
import { JWTAuthGuard } from '../domain/guards/jwt-auth.guard';
import { AuthService } from '../domain/service/auth.service';
import { LoginDto, LogoutDto, RegisterDto } from './auth.dto';

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
  @UseGuards(JWTAuthGuard, AuthGuard)
  async logout(@Body() body: LogoutDto) {
    const user: BaseResponse<UserDto> = await this.userService.findOne(
      body.userId,
    );
    return this.authService.signOut(user.data._id);
  }

  @Get('refreshToken/:userId')
  async refreshToken(@Param('userId') userId: string) {
    const user: BaseResponse<UserDto> = await this.userService.findOne(userId);
    return this.authService.getNewToken(user.data);
  }
}
