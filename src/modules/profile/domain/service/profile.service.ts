import { Injectable } from '@nestjs/common';
import { ProfileDto } from '@root/Profile/application/dto/Profile.dto';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from '@shared/result-model/base-result-model';
import mongoose from 'mongoose';
import { ProfileRepository } from '../repository/Profile.repository';
import { Profile } from '../schema/Profile.schema';

@Injectable()
export class ProfileService {
  result = new BaseResponse();

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

  async update(id: string, Profile: ProfileDto): Promise<BaseResponse<any>> {
    const result = await this.profileRepository.update(id, Profile);

    this.result.init({
      data: result,
      success: true,
      successMassage: persian.EditProfileSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }

  async delete(id: string): Promise<ProfileDto> {
    return await this.profileRepository.delete(id);
  }

  async deleteProfile(id: string, session?: mongoose.ClientSession | null) {
    return await this.profileRepository.delete(id, session);
  }

  async addAvatar(id: string, imagePath: string): Promise<BaseResponse<any>> {
    const profile = await this.findOne(id);
    profile.avatar = imagePath;
    const result: BaseResponse<any> = await this.update(id, profile);
    return result;
  }

  async deleteAvatar(id: string): Promise<BaseResponse<any>> {
    const profile = await this.findOne(id);
    profile.avatar = null;
    const result = await this.profileRepository.update(id, profile);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }
}
