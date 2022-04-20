import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from '@root/menu/application/dto/create.menu.dto';
import { MenuDto } from '@root/Menu/application/dto/Menu.dto';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { MenuRepo } from '../repository/menu.repo';

@Injectable()
export class MenuService {
  result = new BaseResponse();
  constructor(private readonly menuRepository: MenuRepo) {}

  async getMenu(): Promise<BaseResponse<any>> {
    const menu: MenuDto[] = await this.menuRepository.findAll();
    this.result.init({
      data: menu,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async create(menu: CreateMenuDto): Promise<BaseResponse<any>> {
    const data = await this.menuRepository.create(menu);

    this.result.init({
      data: data,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async update(id: string, Menu: MenuDto): Promise<MenuDto> {
    return await this.menuRepository.update(id, Menu);
  }

  async delete(id: string): Promise<MenuDto> {
    return await this.menuRepository.delete(id);
  }
}
