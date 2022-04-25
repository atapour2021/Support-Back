import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { ProfileAdminController } from './application/controller/profile.admin.controller';
import { ProfileUserController } from './application/controller/profile.user.controller';
import { ProfileRepository } from './domain/repository/Profile.repository';
import { Profile, ProfileSchema } from './domain/schema/Profile.schema';
import { ProfileService } from './domain/service/Profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    SharedModule,
  ],
  controllers: [ProfileAdminController, ProfileUserController],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
