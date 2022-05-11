import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ISponsor } from './Sponsor';

export type SponsorDocument = Sponsor & Document;

@Schema()
export class Sponsor implements ISponsor {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  isLegal: boolean;

  @Prop()
  companyName: string;

  @Prop()
  legalCode: string;
}

export const SponsorSchema = SchemaFactory.createForClass(Sponsor);
