import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import {
  AdvertiseModule,
  AuthModule,
  FileUploaderModule,
  MenuModule,
  NotificationModule,
  ProfileModule,
  SponsorModule,
  UserModule,
} from './modules';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    MenuModule,
    FileUploaderModule,
    ProfileModule,
    NotificationModule,
    AdvertiseModule,
    SponsorModule,
  ],
})
export class AppModule {}
