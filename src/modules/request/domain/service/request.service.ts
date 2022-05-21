import { Injectable } from '@nestjs/common';
import { RequestDto } from '@root/Request/application/dto/Request.dto';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { ListResponse } from '@shared/result-model/list.result';
import { RequestRepository } from '../repository/Request.repository';
import { Request } from '../schema/Request.schema';

@Injectable()
export class RequestService {
  result = new BaseResponse();

  constructor(private readonly requestRepository: RequestRepository) {}

  async findAll(): Promise<any> {
    const requests = await this.requestRepository.findAll();
    const result = {
      data: requests,
      success: true,
      total: requests.length,
    };

    return result;
  }

  async findAllByPagination(
    page: number,
    pageSize: number,
  ): Promise<ListResponse<any>> {
    const Requests: RequestDto[] = await this.requestRepository.findAll();
    const result = this.requestRepository.paginate(Requests, page, pageSize);

    return result;
  }

  async findOne(id: string): Promise<BaseResponse<any>> {
    const result = await this.requestRepository.findById(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async create(Request: Request): Promise<BaseResponse<any>> {
    const result: RequestDto = await this.requestRepository.create(Request);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async update(id: string, Request: RequestDto): Promise<BaseResponse<any>> {
    const result = await this.requestRepository.update(id, Request);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async delete(id: string): Promise<BaseResponse<any>> {
    const result = await this.requestRepository.delete(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.DeletedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }
}
