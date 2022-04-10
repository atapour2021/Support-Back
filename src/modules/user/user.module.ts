import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './application/controllers/user.controller';
import { UserRepository } from './domain/repository/user.repository';
import { User, UserSchema } from './domain/schema/user.schema';
import { UserService } from './domain/service/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
