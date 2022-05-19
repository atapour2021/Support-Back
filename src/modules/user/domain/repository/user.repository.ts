import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { AppConfig } from '@shared/config/app.config';
import * as mongoose from 'mongoose';
import { BaseRepository } from 'src/infrastructure/repository/base-repository';
import { UserDto } from '../../application/dto/user.dto';
import { User } from '../schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDto> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<UserDto>, // private readonly profileService: ProfileService, // @InjectConnection() private readonly connection: mongoose.Connection,
  ) {
    super(userModel);
  }

  // async deletetransactionalUser(userId: string) {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();
  //   try {
  //     const user = await this.userModel
  //       .findByIdAndRemove(userId)
  //       .populate('profile')
  //       .session(session);
  //     if (!user) throw new NotFoundException();
  //     const profile = await this.profileService.findOne(user.profileId);
  //     await this.profileService.deleteProfile(profile._id, session);
  //     await session.commitTransaction();
  //   } catch (error) {
  //     await session.abortTransaction();
  //     throw error;
  //   } finally {
  //     session.endSession();
  //   }
  // }

  // async deletetransactionalUser(userId: string) {
  //   // const db = await mongoose.createConnection(AppConfig.mongoUrl).asPromise();
  //   // const session = await db.startSession();
  //   const session = await this.connection.startSession();
  //   session.startTransaction();

  //   await session.withTransaction(async () => {
  //     const user = await this.userModel
  //       .findByIdAndDelete(userId)
  //       .populate('profile')
  //       .session(session);

  //     if (!user) throw new NotFoundException();
  //     const profile = await this.profileService.findOne(user.profileId);

  //     await this.profileService.deleteProfile(profile._id);
  //   });

  //   await session.commitTransaction();
  //   session.endSession();
  // }
}
