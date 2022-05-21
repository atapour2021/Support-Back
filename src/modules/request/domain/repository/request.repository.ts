import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseRepository } from 'src/infrastructure/repository/base-repository';
import { RequestDto } from '../../application/dto/Request.dto';
import { Request } from '../schema/Request.schema';

@Injectable()
export class RequestRepository extends BaseRepository<RequestDto> {
  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: mongoose.Model<RequestDto>,
  ) {
    super(requestModel);
  }
}
