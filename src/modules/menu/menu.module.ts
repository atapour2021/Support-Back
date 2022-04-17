import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from '@root/auth/domain/guards/roles.guard';
import { MenuController } from './application/controller/menu.controller';
import { MenuRepo } from './domain/repository/menu.repo';
import { Menu, MenuSchema } from './domain/schema/Menu.schema';
import { MenuService } from './domain/service/menu.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    JwtModule.register({
      secret: 'APP_SECRET',
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [MenuController],
  providers: [
    MenuService,
    MenuRepo,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class MenuModule {}
