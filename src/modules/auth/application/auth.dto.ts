import { BaseModel } from 'src/infrastructure/model/base-model';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@root/auth/enums/role.enum';

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

export class RefreshTokenDto {
  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  userId: string;
}

export class LogoutDto {
  @ApiProperty()
  userId: string;
}
