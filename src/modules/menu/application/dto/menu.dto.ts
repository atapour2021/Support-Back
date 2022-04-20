import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/infrastructure/model/base-model';

export class MenuDto extends BaseModel {
  @ApiProperty({ required: true })
  displayName: string;

  @ApiProperty({ required: true })
  iconName: string;

  @ApiProperty({ required: true })
  route: string;

  @ApiProperty({
    type: MenuDto,
    default: [{ route: '', iconName: '', displayName: '', children: [] }],
  })
  children?: MenuDto[];
}
