import { ApiProperty } from '@nestjs/swagger';
import { IAdvertise } from '@root/Advertise/domain/schema/Advertise';
import { BaseModel } from 'src/infrastructure/model/base-model';

export class AdvertiseDto extends BaseModel implements IAdvertise {
  @ApiProperty()
  image: string;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  type: string;

  @ApiProperty({ required: true })
  creator: string;

  @ApiProperty({ required: true })
  createDate: Date;

  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  extraDataFile: string;
}
