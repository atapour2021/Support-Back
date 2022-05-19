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
import { AuthGuard } from '@root/auth/domain/guards/auth.guard';
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { Role } from '@root/auth/enums/role.enum';
import { ProfileService } from '../../domain/service/Profile.service';
import { AddAvatarDto, ProfileDto } from '../dto/Profile.dto';

@ApiTags('Profiles')
@Controller('Profiles')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async getAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async create(@Body() profileDto: ProfileDto) {
    return await this.service.create(profileDto);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async addAvatar(@Body() data: AddAvatarDto) {
    return await this.service.addAvatar(data.id, data.imagePath);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async update(@Param('id') id: string, @Body() profileDto: ProfileDto) {
    return await this.service.update(id, profileDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
