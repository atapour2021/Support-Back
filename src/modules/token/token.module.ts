import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from '@root/auth/domain/guards/roles.guard';
import { AppConfig } from '@shared/config/app.config';
import { TokenController } from './application/controller/token.controller';
import { TokenRepository } from './domian/repository/token.repository';
import { Token } from './domian/schema/token';
import { TokenSchema } from './domian/schema/token.schema';
import { TokenService } from './domian/service/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.register({
      secret: AppConfig.SecretKey,
      signOptions: {
        expiresIn: AppConfig.ExpiresIn,
        algorithm: AppConfig.Algorithm,
      },
      verifyOptions: {
        algorithms: [AppConfig.Algorithm],
      },
    }),
  ],
  controllers: [TokenController],
  providers: [
    TokenRepository,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [TokenRepository, TokenService],
})
export class TokenModule {}
