import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseRepository } from 'src/infrastructure/repository/base-repository';
import { AdvertiseDto } from '../../application/dto/Advertise.dto';
import { Advertise } from '../schema/Advertise.schema';

@Injectable()
export class AdvertiseRepository extends BaseRepository<AdvertiseDto> {
  constructor(
    @InjectModel(Advertise.name)
    private readonly advertiseModel: mongoose.Model<AdvertiseDto>,
  ) {
    super(advertiseModel);
  }
}
