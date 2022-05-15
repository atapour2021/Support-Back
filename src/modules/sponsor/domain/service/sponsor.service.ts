import { Injectable } from '@nestjs/common';
import { AuthService } from '@root/auth/domain/service/auth.service';
import { SponsorDto } from '@root/Sponsor/application/dto/Sponsor.dto';
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
    private readonly userService: UserService,
    private readonly authService: AuthService,
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

  async create(Sponsor: Sponsor): Promise<BaseResponse<any>> {
    const sponser: SponsorDto = await this.sponsorRepository.create(Sponsor);
    const result = await this.userService.changeRole(sponser.userId);
    await this.authService.signOut(Sponsor.userId);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.CreatedSuccessfully,
      errorMassage: undefined,
    });

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
