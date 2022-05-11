import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseRepository } from 'src/infrastructure/repository/base-repository';
import { SponsorDto } from '../../application/dto/Sponsor.dto';
import { Sponsor } from '../schema/Sponsor.schema';

@Injectable()
export class SponsorRepository extends BaseRepository<SponsorDto> {
  constructor(
    @InjectModel(Sponsor.name)
    private readonly sponsorModel: mongoose.Model<SponsorDto>,
  ) {
    super(sponsorModel);
  }
}
