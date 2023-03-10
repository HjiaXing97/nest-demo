import { Injectable } from '@nestjs/common';
import path from 'path';
import { readdirSync } from 'fs';

@Injectable()
export class ConfigService {
  config = {};

  constructor() {
    const config = {
      path: path.resolve(__dirname, '../configure')
    };

    readdirSync(config.path).map(async (file) => {
      if (file.slice(-2) === 'js') {
        const module = await import(path.resolve(config.path, file));
        this.config = { ...this.config, ...module.default() };
      }
    });
    console.log(this.config);
  }

  getConfig(path: string) {
    return path.split('.').reduce((config, name) => {
      return config[name];
    }, this.config);
  }
}
