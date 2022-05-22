import { Injectable } from '@nestjs/common';
import { AuthService } from '@root/auth/domain/service/auth.service';
import { RequestDto } from '@root/Request/application/dto/Request.dto';
import { UserService } from '@root/user/domain/service/user.service';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { ListResponse } from '@shared/result-model/list.result';
import { RequestRepository } from '../repository/Request.repository';
import { Request } from '../schema/Request.schema';

@Injectable()
export class RequestService {
  result = new BaseResponse();

  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly userService: UserService,
    readonly authService: AuthService,
  ) {}

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
    const result: RequestDto = await this.requestRepository.findById(id);

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
      successMassage: persian.YourRequestHasBeenSuccessfullySubmitted,
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

  async changeUserRoleToSponsor(id: string): Promise<BaseResponse<any>> {
    const request: BaseResponse<RequestDto> = await this.findOne(id);
    const changeRoleResult: BaseResponse<any> =
      await this.userService.changeUserRoleToSponsor(request.data.userId);

    if (changeRoleResult.success) {
      request.data.confirm = true;
      await this.update(id, request.data);

      await this.authService.signOut(request.data.userId);

      this.result.init({
        data: null,
        success: true,
        successMassage: persian.ActionSuccessfully,
        errorMassage: undefined,
      });
    } else {
      this.result.init({
        data: null,
        success: false,
        successMassage: undefined,
        errorMassage: persian.ErrorPerformingOperations,
      });
    }

    return this.result;
  }
}
