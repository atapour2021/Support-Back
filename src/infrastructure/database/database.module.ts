import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from '@shared/config/app.config';

@Module({
  imports: [
    MongooseModule.forRoot(AppConfig.mongoUrl, {
      useNewUrlParser: true,
      // replicaSet: 'PC-Atapour:27017"',
    }),
  ],
})
export class DatabaseModule {}
