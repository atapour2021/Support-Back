import { BaseModel } from '@infrastructure/model/base-model';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@root/auth/enums/role.enum';
import { IProfile } from '@root/profile/domain/schema/profile';

export class ProfileDto extends BaseModel implements IProfile {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  nationalCode: string;

  @ApiProperty()
  userRole: Role;

  @ApiProperty()
  mobileNumber: string | undefined;

  @ApiProperty()
  email: string | undefined;

  @ApiProperty()
  avatar: string | undefined;
}
