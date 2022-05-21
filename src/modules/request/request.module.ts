import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@root/auth/auth.module';
import { UserModule } from '@root/user/user.module';
import { SharedModule } from '@shared/shared.module';
import { RequestController } from './application/controller/request.controller';
import { RequestTypeController } from './application/controller/request.type.controller';
import { RequestRepository } from './domain/repository/Request.repository';
import { Request, RequestSchema } from './domain/schema/Request.schema';
import { RequestService } from './domain/service/Request.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    SharedModule,
    UserModule,
    AuthModule,
  ],
  controllers: [RequestController, RequestTypeController],
  providers: [RequestRepository, RequestService],
  exports: [RequestService],
})
export class RequestModule {}
