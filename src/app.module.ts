import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './Db.service';

@Module({
  imports: [],
  providers: [
    AppService,
    DbService,
    {
      provide: 'config',
      useValue: 'useValue'
    }
  ],
  controllers: [AppController]
})
export class AppModule {}
