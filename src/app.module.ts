import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  providers: [ConfigService],
  controllers: [],
  imports: [ConfigModule]
})
export class AppModule {}
