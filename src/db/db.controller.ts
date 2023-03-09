import { Controller, Get } from '@nestjs/common';
import { DbService } from './db.service';

@Controller('db')
export class DbController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  getDb() {
    return this.dbService.getDb();
  }

  @Get('test')
  getTest() {
    return 'GET_TEST';
  }
}
