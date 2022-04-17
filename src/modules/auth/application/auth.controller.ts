import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { AuthService } from '../domain/service/auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<BaseResponse<any>> {
    return await this.authService.login(body);
  }

  @Post('register')
  async loregistergin(@Body() body: RegisterDto): Promise<BaseResponse<any>> {
    return await this.authService.register(body);
  }
}
