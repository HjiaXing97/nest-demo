import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { DbService } from './Db.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: DbService,
    @Inject('config')
    private readonly config
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('list')
  getList() {
    return this.dbService.getList();
  }

  @Get('test')
  getTest() {
    return this.config;
  }
}
