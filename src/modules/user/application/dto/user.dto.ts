import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@root/auth/enums/role.enum';
import { IUser } from '@root/user/domain/schema/user';
import { BaseModel } from 'src/infrastructure/model/base-model';

export class UserDto extends BaseModel implements IUser {
  _id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  nationalCode: string;

  @ApiProperty()
  userRole: Role;

  @ApiProperty()
  profileId: string;
}
