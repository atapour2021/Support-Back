import { BaseModel } from 'src/infrastructure/model/base-model';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@root/auth/enums/role.enum';

export class LoginDto extends BaseModel {
  @ApiProperty({ default: 'kia' })
  userName: string;

  @ApiProperty({ default: 'kia123' })
  password: string;
}

export class RegisterDto extends BaseModel {
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
}
