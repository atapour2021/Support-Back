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
import { CreateMenuDto } from '../dto/create.menu.dto';
import { MenuDto } from '../dto/menu.dto';

@ApiTags('Menu')
@Controller('Menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async get() {
    console.log();
    return await this.service.getMenu();
  }

  @Get(':role')
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async getMenuByRole(@Param('role') role: Role) {
    return await this.service.getMenuByRole(role);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.service.create(createMenuDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async update(@Param('id') id: string, @Body() menuDto: MenuDto) {
    return await this.service.update(id, menuDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
