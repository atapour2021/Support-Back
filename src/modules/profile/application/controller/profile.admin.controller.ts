import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@root/auth/domain/decorator/roles.decorator';
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { Role } from '@root/auth/enums/role.enum';
import { ProfileService } from '../../domain/service/Profile.service';
import { ProfileDto } from '../dto/Profile.dto';

@ApiTags('Admin-Profiles')
@Controller('Admin-Profiles')
export class ProfileAdminController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async getAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async create(@Body() profileDto: ProfileDto) {
    return await this.service.create(profileDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async update(@Param('id') id: string, @Body() profileDto: ProfileDto) {
    return await this.service.update(id, profileDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
