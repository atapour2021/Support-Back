import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@root/auth/enums/role.enum';
import { Document } from 'mongoose';
import { IUser } from './user';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  _id: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  age: number;

  @Prop({ required: true, maxlength: 10, minlength: 10 })
  nationalCode: string;

  @Prop({ required: true })
  userRole: Role;

  @Prop()
  profileId: string;

  @Prop()
  hashedRefreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
