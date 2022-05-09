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
import { AdvertiseService } from '../../domain/service/Advertise.service';
import { AdvertiseDto } from '../dto/Advertise.dto';

@ApiTags('Advertises')
@Controller('Advertises')
export class AdvertiseController {
  constructor(private readonly service: AdvertiseService) {}

  @Get('/:page/:pageSize/:userId')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async getAll(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
    @Param('userId') userId: string,
  ) {
    return await this.service.findAllByPagination(page, pageSize, userId);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async create(@Body() advertiseDto: AdvertiseDto) {
    return await this.service.create(advertiseDto);
  }

  @Put(':id')
  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async update(@Param('id') id: string, @Body() advertiseDto: AdvertiseDto) {
    return await this.service.update(id, advertiseDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
