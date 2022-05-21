import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestModule } from '@root/request/request.module';
import { UserModule } from '@root/user/user.module';
import { SharedModule } from '@shared/shared.module';
import { SponsorController } from './application/controllers/Sponsor.controller';
import { SponsorRepository } from './domain/repository/Sponsor.repository';
import { Sponsor, SponsorSchema } from './domain/schema/Sponsor.schema';
import { SponsorService } from './domain/service/Sponsor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sponsor.name, schema: SponsorSchema }]),
    SharedModule,
    RequestModule,
    UserModule,
  ],
  controllers: [SponsorController],
  providers: [SponsorRepository, SponsorService],
  exports: [],
})
export class SponsorModule {}
