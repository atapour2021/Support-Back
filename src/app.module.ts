import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
})
export class AppModule {}
