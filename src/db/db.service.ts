import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  public getDb() {
    return 'GET_DB';
  }
}
