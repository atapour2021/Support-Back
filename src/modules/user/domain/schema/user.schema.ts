import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from './user';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  nationalCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
