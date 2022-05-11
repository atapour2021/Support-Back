import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from '@root/profile/profile.module';
import { SharedModule } from '@shared/shared.module';
import { UserController } from './application/controllers/user.controller';
import { UserRepository } from './domain/repository/user.repository';
import { User, UserSchema } from './domain/schema/user.schema';
import { UserService } from './domain/service/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
    ProfileModule,
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
