import { BaseRepository } from '@infrastructure/repository/base-repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '@root/auth/enums/role.enum';
import { MenuDto } from '@root/menu/application/dto/menu.dto';
import * as mongoose from 'mongoose';
import { Menu } from '../schema/menu.schema';

@Injectable()
export class MenuRepo extends BaseRepository<MenuDto> {
  constructor(
    @InjectModel(Menu.name)
    private readonly menuModel: mongoose.Model<MenuDto>,
  ) {
    super(menuModel);
  }

  async getMenuByRole(role: Role): Promise<MenuDto[]> {
    const menus: MenuDto[] = await this.menuModel.find().exec();
    const menuByRole: MenuDto[] = [];
    menus.forEach((menu: MenuDto) => {
      if (menu.role === role) menuByRole.push(menu);
    });
    return menuByRole;
  }
}
