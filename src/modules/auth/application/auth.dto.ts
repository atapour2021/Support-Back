import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@root/auth/enums/role.enum';
import { BaseModel } from 'src/infrastructure/model/base-model';
import { IAuth } from '../domain/schema/Auth';

export class LoginDto extends BaseModel {
  @ApiProperty({ default: 'admin' })
  userName: string;

  @ApiProperty({ default: '123' })
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

export class LogoutDto extends BaseModel {
  @ApiProperty()
  userId: string;
}

export class AuthDto extends BaseModel implements IAuth {
  _id: string;

  @ApiProperty()
  hashToken: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  expire: boolean;
}
