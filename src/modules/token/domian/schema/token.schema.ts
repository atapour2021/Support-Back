import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IToken } from './token';

export type TokenDocument = Token & Document;

@Schema()
export class Token implements IToken {
  _id: string;

  @Prop({ required: true })
  hashToken: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  expire: boolean;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
