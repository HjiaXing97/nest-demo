import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [],
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ]
})
export class AppModule {}
