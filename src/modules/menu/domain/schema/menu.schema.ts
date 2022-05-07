import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@root/auth/enums/role.enum';
import { Document } from 'mongoose';
import { MenuItem } from './Menu';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu implements MenuItem {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  iconName: string;

  @Prop({ required: true })
  route: string;

  @Prop({ type: MenuItem })
  children?: MenuItem[];

  @Prop({ required: true })
  role: Role;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
