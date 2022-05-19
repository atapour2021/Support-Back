import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@root/auth/domain/guards/auth.guard';
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { ProfileService } from '../../domain/service/Profile.service';
import { AddAvatarDto } from '../dto/Profile.dto';

@ApiTags('Avatar-Profile')
@Controller('Avatar-Profile')
export class AvatarProfileController {
  constructor(private readonly service: ProfileService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async create(@Body() data: AddAvatarDto) {
    return await this.service.addAvatar(data.id, data.imagePath);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.deleteAvatar(id);
  }
}
