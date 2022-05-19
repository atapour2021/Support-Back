import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@root/auth/domain/decorator/roles.decorator';
import { AuthGuard } from '@root/auth/domain/guards/auth.guard';
import { JWTAuthGuard } from '@root/auth/domain/guards/jwt-auth.guard';
import { Role } from '@root/auth/enums/role.enum';
import { TokenService } from '@root/token/domian/service/token.service';
import { TokenDto } from '../dto/Token.dto';

@ApiTags('Tokens')
@Controller('Tokens')
export class TokenController {
  constructor(private readonly service: TokenService) {}

  @Get('/:page/:pageSize')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async getAll(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
  ) {
    return await this.service.findAllByPagination(page, pageSize);
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async create(@Body() tokenDto: TokenDto) {
    return await this.service.create(tokenDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async update(@Param('id') id: string, @Body() tokenDto: TokenDto) {
    return await this.service.update(id, tokenDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard, AuthGuard)
  async checkAuth(@Req() req: any) {
    return await this.service.ValidateToken(req);
  }
}
