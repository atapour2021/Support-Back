import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@root/user/user.module';
import { SharedModule } from '@shared/shared.module';
import { NotificationController } from './application/controller/notification.controller';
import { NotificationGateway } from './application/gateway/notification.gateway';
import { NotificationRepository } from './domain/repository/Notification.repository';
import {
  Notification,
  NotificationSchema,
} from './domain/schema/Notification.schema';
import { NotificationService } from './domain/service/Notification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    SharedModule,
    UserModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationRepository, NotificationService, NotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}
