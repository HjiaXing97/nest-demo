import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  controllers: [ConfigController]
})
export class ConfigModule {
  static register(config: { path: string }): DynamicModule {
    return {
      module: ConfigModule, //必须得有module属性
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: config
        }
      ],
      exports: ['CONFIG_OPTIONS']
    };
  }
}
