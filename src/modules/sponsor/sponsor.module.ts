import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@root/auth/auth.module';
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
    UserModule,
    AuthModule,
  ],
  controllers: [SponsorController],
  providers: [SponsorRepository, SponsorService],
  exports: [],
})
export class SponsorModule {}
