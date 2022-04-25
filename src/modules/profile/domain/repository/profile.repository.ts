import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseRepository } from 'src/infrastructure/repository/base-repository';
import { ProfileDto } from '../../application/dto/Profile.dto';
import { Profile } from '../schema/Profile.schema';

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileDto> {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: mongoose.Model<ProfileDto>,
  ) {
    super(profileModel);
  }
}
