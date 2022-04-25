import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@root/auth/enums/role.enum';
import { Document } from 'mongoose';
import { IProfile } from './Profile';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile implements IProfile {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, maxlength: 10, minlength: 10 })
  nationalCode: string;

  @Prop({ required: true })
  userRole: Role;

  @Prop()
  age: number;

  @Prop({ maxlength: 11, minlength: 11 })
  mobileNumber: string;

  @Prop({ email: true })
  email: string;

  @Prop()
  avatar: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
