import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseRepository } from 'src/infrastructure/repository/base-repository';
import { UserDto } from '../../application/dto/user.dto';
import { User } from '../schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDto> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<UserDto>,
  ) {
    super(userModel);
  }
}
