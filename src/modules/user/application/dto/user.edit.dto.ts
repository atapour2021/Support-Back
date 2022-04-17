import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@root/auth/enums/role.enum';
import { BaseModel } from 'src/infrastructure/model/base-model';

export class UserEditDto extends BaseModel {
  @ApiProperty()
  role: Role;
}
