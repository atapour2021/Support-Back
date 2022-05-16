import { BaseModel } from '@infrastructure/model/base-model';
import { ApiProperty } from '@nestjs/swagger';
import { IToken } from '@root/token/domian/schema/token';

export class TokenDto extends BaseModel implements IToken {
  _id: string;

  @ApiProperty()
  hashToken: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  expire: boolean;
}
