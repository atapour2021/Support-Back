import { BaseModel } from '@infrastructure/model/base-model';
import { ApiProperty } from '@nestjs/swagger';
import { INotification } from '@root/notification/domain/schema/notification';

export class NotificationDto extends BaseModel implements INotification {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createDate: Date;

  @ApiProperty()
  creator: string;

  @ApiProperty()
  isVisited: boolean;
}
