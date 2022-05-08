import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { INotification } from './Notification';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification implements INotification {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  createDate: Date;

  @Prop({ required: true })
  creator: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  isVisited: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
