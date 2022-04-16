import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@root/auth/enums/role.enum';
import { Document } from 'mongoose';
import { IUser } from './user';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  firstName: string;

  lastName: string;

  age: number;

  @Prop({ required: true })
  nationalCode: string;

  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
