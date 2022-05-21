import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@root/auth/domain/decorator/roles.decorator';
import { AuthGuard } from '@root/auth/domain/guards/auth.guard';
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { AuthService } from '@root/auth/domain/service/auth.service';
import { Role } from '@root/auth/enums/role.enum';
import { UserService } from '@root/user/domain/service/user.service';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { ChangeUserRoleToSponsorDto } from '../dto/Request.dto';

@ApiTags('Request-type')
@Controller('Request-type')
export class RequestTypeController {
  constructor(
    private readonly userService: UserService,
    readonly authService: AuthService,
  ) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async create(@Body() data: ChangeUserRoleToSponsorDto) {
    const changeRoleResult: BaseResponse<any> =
      await this.userService.changeUserRoleToSponsor(data.userId);
    if (changeRoleResult.success) await this.authService.signOut(data.userId);

    return changeRoleResult;
  }
}
