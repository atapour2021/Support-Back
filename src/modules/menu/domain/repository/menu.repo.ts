import { BaseRepository } from '@infrastructure/repository/base-repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
}
