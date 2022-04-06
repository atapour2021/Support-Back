import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../domain/service/user.service';
import { UserDto } from '../dto/user.dto';

@ApiTags('Users')
@Controller('Users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.service.create(userDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto) {
    return await this.service.update(id, userDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
