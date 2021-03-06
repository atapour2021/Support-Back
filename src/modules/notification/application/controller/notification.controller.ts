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
import { AuthGuard } from '@root/auth/domain/guards/auth.guard';
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { NotificationService } from '../../domain/service/Notification.service';
import { NotificationDto } from '../dto/Notification.dto';

@ApiTags('Notifications')
@Controller('Notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get('/:page/:pageSize/:userId')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async getAll(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
    @Param('userId') userId: string,
  ) {
    return await this.service.findAll(page, pageSize, userId);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async create(@Body() notification: NotificationDto) {
    return await this.service.create(notification);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async update(@Param('id') id: string, @Body() notification: NotificationDto) {
    return await this.service.update(id, notification);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
