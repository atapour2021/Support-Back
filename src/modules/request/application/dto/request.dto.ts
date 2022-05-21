import { ApiProperty } from '@nestjs/swagger';
import { RequestState, Type } from '@root/request/domain/enum/request.enum';
import { IRequest } from '@root/Request/domain/schema/Request';
import { BaseModel } from 'src/infrastructure/model/base-model';

export class RequestDto extends BaseModel implements IRequest {
  _id: string;

  @ApiProperty({ required: true })
  type: Type;

  @ApiProperty({ required: true })
  applicant: string;

  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  requestDate: Date;

  @ApiProperty({ readOnly: true })
  requestState: RequestState;

  @ApiProperty()
  description: string;
}
export class ChangeUserRoleToSponsorDto extends BaseModel {
  @ApiProperty({ required: true })
  userId: string;
}
