import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseRepository } from 'src/infrastructure/repository/base-repository';
import { NotificationDto } from '../../application/dto/Notification.dto';
import { Notification } from '../schema/Notification.schema';

@Injectable()
export class NotificationRepository extends BaseRepository<NotificationDto> {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: mongoose.Model<NotificationDto>,
  ) {
    super(notificationModel);
  }
}
