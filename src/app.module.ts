import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@root/auth/auth.module';
import { FileUploaderModule } from '@root/file-uploader/file-uploader.module';
import { MenuModule } from '@root/menu/menu.module';
import { NotificationModule } from '@root/notification/notification.module';
import { ProfileModule } from '@root/profile/profile.module';
import { UserModule } from '@root/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    MenuModule,
    FileUploaderModule,
    ProfileModule,
    NotificationModule,
  ],
})
export class AppModule {}
