import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { NotificationModule } from '@root/notification/notification.module';
import { ProfileModule } from '@root/profile/profile.module';
import { SharedModule } from '@shared/shared.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './application/auth.controller';
import { AuthService } from './domain/service/auth.service';
import { JwtStrategy } from './domain/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule,
    ProfileModule,
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
