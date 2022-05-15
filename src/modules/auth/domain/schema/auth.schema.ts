import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAuth } from './Auth';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth implements IAuth {
  _id: string;

  @Prop({ required: true })
  hashToken: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  expire: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
