import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { AvatarProfileController } from './application/controller/avatar.controller';
import { ProfileController } from './application/controller/profile.controller';
import { ProfileRepository } from './domain/repository/Profile.repository';
import { Profile, ProfileSchema } from './domain/schema/Profile.schema';
import { ProfileService } from './domain/service/Profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    SharedModule,
  ],
  controllers: [ProfileController, AvatarProfileController],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
