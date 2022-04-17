import { Injectable } from '@nestjs/common';
import { UserDto } from '@root/user/application/dto/user.dto';
import { UserEditDto } from '@root/user/application/dto/user.edit.dto';
import { UserRepository } from '../repository/user.repository';
import { User } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.userRepository.findById(id);
  }

  async create(user: User): Promise<UserDto> {
    return await this.userRepository.create(user);
  }

  async update(id: string, user: UserEditDto): Promise<UserEditDto> {
    return await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<UserDto> {
    return await this.userRepository.delete(id);
  }
}
