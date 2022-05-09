import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAdvertise } from './Advertise';

export type AdvertiseDocument = Advertise & Document;

@Schema()
export class Advertise implements IAdvertise {
  @Prop()
  image: string;

  @Prop({ required: true })
  creator: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  createDate: Date;

  @Prop()
  description: string;

  @Prop()
  extraDataFile: string;

  @Prop({ required: true })
  userId: string;
}

export const AdvertiseSchema = SchemaFactory.createForClass(Advertise);
