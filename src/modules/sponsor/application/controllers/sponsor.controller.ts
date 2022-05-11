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
import { SponsorService } from '../../domain/service/Sponsor.service';
import { SponsorDto } from '../dto/Sponsor.dto';

@ApiTags('Sponsors')
@Controller('Sponsors')
export class SponsorController {
  constructor(private readonly service: SponsorService) {}

  @Get('/:page/:pageSize')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async getAll(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
  ) {
    return await this.service.findAllByPagination(page, pageSize);
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
  async create(@Body() sponsorDto: SponsorDto) {
    return await this.service.create(sponsorDto);
  }

  @Put(':id')
  @Roles(Role.Sponsor)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async update(@Param('id') id: string, @Body() sponsorDto: SponsorDto) {
    return await this.service.update(id, sponsorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @UseGuards(JWTAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
