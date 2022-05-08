import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { AdvertiseController } from './application/controller/advertise.controller';
import { AdvertiseRepository } from './domain/repository/Advertise.repository';
import { Advertise, AdvertiseSchema } from './domain/schema/Advertise.schema';
import { AdvertiseService } from './domain/service/Advertise.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Advertise.name, schema: AdvertiseSchema },
    ]),
    SharedModule,
  ],
  controllers: [AdvertiseController],
  providers: [AdvertiseRepository, AdvertiseService],
})
export class AdvertiseModule {}
