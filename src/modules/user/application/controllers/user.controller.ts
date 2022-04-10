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
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { UserService } from '../../domain/service/user.service';
import { UserDto } from '../dto/user.dto';

@ApiTags('Users')
@Controller('Users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async getAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async create(@Body() userDto: UserDto) {
    return await this.service.create(userDto);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async update(@Param('id') id: string, @Body() userDto: UserDto) {
    return await this.service.update(id, userDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
