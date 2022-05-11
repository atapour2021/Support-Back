import { ApiProperty } from '@nestjs/swagger';
import { ISponsor } from '@root/Sponsor/domain/schema/Sponsor';
import { BaseModel } from 'src/infrastructure/model/base-model';

export class SponsorDto extends BaseModel implements ISponsor {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  isLegal: boolean;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  legalCode: string;
}
