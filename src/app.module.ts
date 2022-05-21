import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import {
  AdvertiseModule,
  AuthModule,
  FileUploaderModule,
  MenuModule,
  NotificationModule,
  ProfileModule,
  RequestModule,
  SponsorModule,
  TokenModule,
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
    TokenModule,
    RequestModule,
  ],
})
export class AppModule {}
