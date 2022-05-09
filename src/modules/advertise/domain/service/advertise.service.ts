import { Injectable } from '@nestjs/common';
import { AdvertiseDto } from '@root/Advertise/application/dto/Advertise.dto';
import { UserService } from '@root/user/domain/service/user.service';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { ListResponse } from '@shared/result-model/list.result';
import { AdvertiseRepository } from '../repository/Advertise.repository';
import { Advertise } from '../schema/Advertise.schema';

@Injectable()
export class AdvertiseService {
  result = new BaseResponse();

  constructor(
    private readonly advertiseRepository: AdvertiseRepository,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<any> {
    const advertises = await this.advertiseRepository.findAll();
    const result = {
      data: advertises,
      success: true,
      total: advertises.length,
    };

    return result;
  }

  async findAllByPagination(
    page: number,
    pageSize: number,
    userId: string,
  ): Promise<ListResponse<AdvertiseDto>> {
    const userAdvertises: AdvertiseDto[] = [];
    const advertises: AdvertiseDto[] = await this.advertiseRepository.findAll();

    advertises.forEach((advertise: AdvertiseDto) => {
      if (advertise.userId === userId) userAdvertises.push(advertise);
    });

    const result = this.advertiseRepository.paginate(
      userAdvertises,
      page,
      pageSize,
    );

    return result;
  }

  async findOne(id: string): Promise<BaseResponse<any>> {
    const result = await this.advertiseRepository.findById(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async create(Advertise: Advertise): Promise<BaseResponse<any>> {
    const user = await this.userService.findOne(Advertise.userId);
    Advertise.creator = user.data.fullName;
    const result: AdvertiseDto = await this.advertiseRepository.create(
      Advertise,
    );

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.CreatedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }

  async update(
    id: string,
    Advertise: AdvertiseDto,
  ): Promise<BaseResponse<any>> {
    const result = await this.advertiseRepository.update(id, Advertise);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.UpdatedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }

  async delete(id: string): Promise<BaseResponse<any>> {
    const result = await this.advertiseRepository.delete(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.DeletedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }
}
