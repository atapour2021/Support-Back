import { Injectable } from '@nestjs/common';
import { UserDto } from '@root/user/application/dto/user.dto';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { UserRepository } from '../repository/user.repository';
import { User } from '../schema/user.schema';

@Injectable()
export class UserService {
  result = new BaseResponse();

  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<any> {
    const users = await this.userRepository.findAll();
    const result = {
      data: users,
      success: true,
      total: users.length,
    };

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
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }
}
