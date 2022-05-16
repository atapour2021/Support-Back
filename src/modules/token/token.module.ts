import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { TokenController } from './application/controller/token.controller';
import { TokenRepository } from './domian/repository/token.repository';
import { Token } from './domian/schema/token';
import { TokenSchema } from './domian/schema/token.schema';
import { TokenService } from './domian/service/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    SharedModule,
  ],
  controllers: [TokenController],
  providers: [TokenRepository, TokenService],
  exports: [TokenRepository, TokenService],
})
export class TokenModule {}
