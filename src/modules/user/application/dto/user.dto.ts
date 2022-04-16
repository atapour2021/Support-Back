import { BaseModel } from 'src/infrastructure/model/base-model';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@root/auth/enums/role.enum';

export class UserDto extends BaseModel {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  nationalCode: string;

  role: Role;
}
