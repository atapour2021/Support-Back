import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IMenu, MenuDto } from './Menu';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu implements IMenu {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  iconName: string;

  @Prop({ required: true })
  route: string;

  @Prop({ type: MenuDto })
  children: MenuDto[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
