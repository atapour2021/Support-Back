import { Injectable } from '@nestjs/common';
import { NotificationDto } from '@root/Notification/application/dto/Notification.dto';
import { NotificationGateway } from '@root/notification/application/gateway/notification.gateway';
import { BaseResponse } from '@shared/result-model/base-result-model';
import { ListResponse } from '@shared/result-model/list.result';
import { NotificationRepository } from '../repository/Notification.repository';
import { Notification } from '../schema/Notification.schema';

@Injectable()
export class NotificationService {
  result = new BaseResponse();

  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async findAll(page: number, pageSize: number): Promise<ListResponse<any>> {
    const notifications: NotificationDto[] =
      await this.notificationRepository.findAll();

    const result = this.notificationRepository.paginate(
      notifications,
      page,
      pageSize,
    );

    return result;
  }

  async findOne(id: string): Promise<BaseResponse<any>> {
    const notification = await this.notificationRepository.findById(id);

    this.result.init({
      data: notification,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async create(Notification: Notification): Promise<BaseResponse<any>> {
    const result = await this.notificationRepository.create(Notification);
    await this.notificationGateway.sendNotification(result.description);

    this.result.init({
      data: result,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async update(
    id: string,
    Notification: NotificationDto,
  ): Promise<BaseResponse<any>> {
    const updatedNotification = await this.notificationRepository.update(
      id,
      Notification,
    );

    this.result.init({
      data: updatedNotification,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }

  async delete(id: string): Promise<BaseResponse<any>> {
    const deletedNotification = await this.notificationRepository.delete(id);

    this.result.init({
      data: deletedNotification,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });

    return this.result;
  }
}
