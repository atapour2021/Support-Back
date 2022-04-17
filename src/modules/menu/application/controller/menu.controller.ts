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
import { MenuService } from '@root/menu/domain/service/menu.service';
import { MenuDto } from '../dto/menu.dto';

@ApiTags('Menu')
@Controller('Menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get()
  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async get() {
    return await this.service.getMenu();
  }

  @Post()
  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async create(@Body() menuDto: MenuDto) {
    return await this.service.create(menuDto);
  }

  @Put(':id')
  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async update(@Param('id') id: string, @Body() menuDto: MenuDto) {
    return await this.service.update(id, menuDto);
  }

  @Delete(':id')
  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
