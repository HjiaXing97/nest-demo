import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import path from 'path';

const configPath = path.resolve(__dirname, './configure');

@Module({
  providers: [ConfigService],
  controllers: [],
  imports: [ConfigModule.register({ path: configPath })]
})
export class AppModule {}
