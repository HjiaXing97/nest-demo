import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Validate from './validate';
import { FilterValidateFilter } from './filter-validate/filter-validate.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new Validate());
  app.useGlobalFilters(new FilterValidateFilter());
  await app.listen(3000);
}

bootstrap().then();
