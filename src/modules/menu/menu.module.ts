import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { MenuController } from './application/controller/menu.controller';
import { MenuRepo } from './domain/repository/menu.repo';
import { Menu, MenuSchema } from './domain/schema/Menu.schema';
import { MenuService } from './domain/service/menu.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    SharedModule,
  ],
  controllers: [MenuController],
  providers: [MenuService, MenuRepo],
})
export class MenuModule {}
