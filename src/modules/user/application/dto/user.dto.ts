import { BaseModel } from 'src/infrastructure/model/base-model';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends BaseModel {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  nationalCode: string;
}
