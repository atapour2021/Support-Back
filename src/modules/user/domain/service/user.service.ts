import { Injectable } from '@nestjs/common';
import { Role } from '@root/auth/enums/role.enum';
import { ProfileService } from '@root/profile/domain/service/Profile.service';
import { UserDto } from '@root/user/application/dto/user.dto';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { ListResponse } from '@shared/result-model/list.result';
import { UserRepository } from '../repository/user.repository';
import { User } from '../schema/user.schema';

@Injectable()
export class UserService {
  result = new BaseResponse();

  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService,
  ) {}

  async findAll(): Promise<any> {
    const users = await this.userRepository.findAll();
    const result = {
      data: users,
      success: true,
      total: users.length,
    };

    return result;
  }

  async findAllByPagination(
    page: number,
    pageSize: number,
  ): Promise<ListResponse<any>> {
    const users: UserDto[] = await this.userRepository.findAll();

    const result = this.userRepository.paginate(users, page, pageSize);

    return result;
  }

  async findOne(id: string): Promise<BaseResponse<any>> {
    const result = await this.userRepository.findById(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async create(user: User): Promise<BaseResponse<any>> {
    const result: UserDto = await this.userRepository.create(user);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async update(id: string, user: UserDto): Promise<BaseResponse<any>> {
    const result = await this.userRepository.update(id, user);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async delete(id: string): Promise<BaseResponse<any>> {
    const result = await this.userRepository.delete(id);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.DeletedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }

  async changeRole(userId: string): Promise<BaseResponse<any>> {
    const user: User = await this.userRepository.findById(userId);
    user.userRole = Role.Sponsor;
    await this.userRepository.update(userId, user);

    const profile = await this.profileService.findOne(user.profileId);
    profile.userRole = Role.Sponsor;
    await this.profileService.update(user.profileId, profile);

    this.result.init({
      data: null,
      success: true,
      successMassage: persian.ChangeRoleSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }
}
