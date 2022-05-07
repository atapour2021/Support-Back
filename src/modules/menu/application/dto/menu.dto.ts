import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@root/auth/enums/role.enum';
import { BaseModel } from 'src/infrastructure/model/base-model';

export class MenuDto extends BaseModel {
  @ApiProperty({ required: true })
  displayName: string;

  @ApiProperty({ required: true })
  iconName: string;

  @ApiProperty({ required: true })
  route: string;

  @ApiProperty({ required: true })
  role: Role;

  @ApiProperty({
    type: MenuDto,
    default: [
      { route: '', iconName: '', displayName: '', role: '', children: [] },
    ],
  })
  children?: MenuDto[];
}
