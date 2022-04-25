import { Injectable } from '@nestjs/common';
import { ProfileDto } from '@root/Profile/application/dto/Profile.dto';
import { ProfileRepository } from '../repository/Profile.repository';
import { Profile } from '../schema/Profile.schema';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async findAll(): Promise<ProfileDto[]> {
    return await this.profileRepository.findAll();
  }

  async findOne(id: string): Promise<ProfileDto> {
    return await this.profileRepository.findById(id);
  }

  async create(Profile: Profile): Promise<ProfileDto> {
    return await this.profileRepository.create(Profile);
  }

  async update(id: string, Profile: ProfileDto): Promise<ProfileDto> {
    return await this.profileRepository.update(id, Profile);
  }

  async delete(id: string): Promise<ProfileDto> {
    return await this.profileRepository.delete(id);
  }
}
