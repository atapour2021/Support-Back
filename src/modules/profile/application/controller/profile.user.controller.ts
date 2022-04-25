import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@root/auth/domain/decorator/roles.decorator';
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { Role } from '@root/auth/enums/role.enum';
import { ProfileService } from '../../domain/service/Profile.service';
import { ProfileDto } from '../dto/Profile.dto';

@ApiTags('User-Profiles')
@Controller('User-Profiles')
export class ProfileUserController {
  constructor(private readonly service: ProfileService) {}

  @Get(':id')
  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async update(@Param('id') id: string, @Body() profileDto: ProfileDto) {
    return await this.service.update(id, profileDto);
  }
}
