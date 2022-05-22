import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RequestState, Type } from '../enum/request.enum';
import { IRequest } from './Request';

export type RequestDocument = Request & Document;

@Schema()
export class Request implements IRequest {
  _id: string;

  @Prop({ required: true })
  type: Type;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  applicant: string;

  @Prop({ required: true })
  requestDate: Date;

  @Prop({ readonly: true })
  requestState: RequestState;

  @Prop()
  confirm: boolean;

  @Prop()
  description: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
