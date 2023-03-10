import { Inject, Injectable, Optional } from '@nestjs/common';
import path from 'path';
import { readdirSync } from 'fs';

@Injectable()
export class ConfigService {
  constructor(
    @Inject('CONFIG_OPTIONS')
    private options: { path: string },
    @Optional() private config = {}
  ) {
    readdirSync(options.path).map(async (file) => {
      if (file.slice(-2) === 'js') {
        const module = await import(path.resolve(options.path, file));
        this.config = { ...this.config, ...module.default() };
      }
    });
  }

  getConfig(path: string) {
    return path.split('.').reduce((config, name) => {
      return config[name];
    }, this.config);
  }
}
