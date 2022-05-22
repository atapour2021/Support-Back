import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@root/auth/domain/decorator/roles.decorator';
import { AuthGuard } from '@root/auth/domain/guards/auth.guard';
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { Role } from '@root/auth/enums/role.enum';
import { RequestService } from '@root/request/domain/service/Request.service';
import { ChangeUserRoleToSponsorDto } from '../dto/Request.dto';

@ApiTags('Request-type')
@Controller('Request-type')
export class RequestTypeController {
  constructor(private readonly service: RequestService) {}

  @Post('changeUserRole')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async create(@Body() data: ChangeUserRoleToSponsorDto) {
    return this.service.changeUserRoleToSponsor(data.id);
  }
}
