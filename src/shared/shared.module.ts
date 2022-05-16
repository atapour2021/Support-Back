import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '@root/auth/domain/guards/roles.guard';
import { TokenModule } from '@root/token/token.module';
import { AppConfig } from './config/app.config';

@Module({
  imports: [
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
    TokenModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtModule, TokenModule],
})
export class SharedModule {}
