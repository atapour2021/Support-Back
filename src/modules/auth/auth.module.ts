import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { NotificationModule } from '@root/notification/notification.module';
import { ProfileModule } from '@root/profile/profile.module';
import { SharedModule } from '@shared/shared.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './application/auth.controller';
import { AuthRepository } from './domain/repository/auth.repository';
import { Auth } from './domain/schema/Auth';
import { AuthSchema } from './domain/schema/Auth.schema';
import { AuthService } from './domain/service/auth.service';
import { JwtStrategy } from './domain/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule,
    ProfileModule,
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
