import { Injectable } from '@nestjs/common';
import { RequestState, Type } from '@root/request/domain/enum/request.enum';
import { RequestService } from '@root/request/domain/service/Request.service';
import { SponsorDto } from '@root/Sponsor/application/dto/Sponsor.dto';
import { UserDto } from '@root/user/application/dto/user.dto';
import { UserService } from '@root/user/domain/service/user.service';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { ListResponse } from '@shared/result-model/list.result';
import { SponsorRepository } from '../repository/Sponsor.repository';
import { Sponsor } from '../schema/Sponsor.schema';

@Injectable()
export class SponsorService {
  result = new BaseResponse();

  constructor(
    private readonly sponsorRepository: SponsorRepository,
    private readonly requestService: RequestService,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<any> {
    const sponsors = await this.sponsorRepository.findAll();
    const result = {
      data: sponsors,
      success: true,
      total: sponsors.length,
    };

    return result;
  }

  async findAllByPagination(
    page: number,
    pageSize: number,
  ): Promise<ListResponse<SponsorDto>> {
    const sponsors: SponsorDto[] = await this.sponsorRepository.findAll();

    const result = this.sponsorRepository.paginate(sponsors, page, pageSize);

    return result;
  }

  async findOne(id: string): Promise<BaseResponse<any>> {
    const result: SponsorDto = await this.sponsorRepository.findById(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async create(data: Sponsor): Promise<BaseResponse<any>> {
    const user: BaseResponse<UserDto> = await this.userService.findOne(
      data.userId,
    );
    if (user) {
      const sponser: SponsorDto = await this.sponsorRepository.create(data);
      if (sponser) {
        const requestData: any = {
          type: Type.ChangeUserRoleToSponsor,
          applicant: user.data.fullName,
          userId: sponser.userId,
          confirm: false,
          requestDate: new Date(),
          requestState: RequestState.Pending,
          description: undefined,
        };
        const request = await this.requestService.create(requestData);
        this.result = request;
      } else {
        this.result.init({
          data: null,
          success: false,
          successMassage: undefined,
          errorMassage: persian.UserNotFound,
        });
      }
    } else {
      this.result.init({
        data: null,
        success: false,
        successMassage: undefined,
        errorMassage: persian.UserNotFound,
      });
    }

    return this.result;
  }

  async update(id: string, Sponsor: SponsorDto): Promise<BaseResponse<any>> {
    const result = await this.sponsorRepository.update(id, Sponsor);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.UpdatedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }

  async delete(id: string): Promise<BaseResponse<any>> {
    const result = await this.sponsorRepository.delete(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.DeletedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }
}
