import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Validate from './common/validate';
import TransFormInterceptor from './response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new Validate());
  app.useGlobalInterceptors(new TransFormInterceptor());
  app.setGlobalPrefix('api'); //添加全局请求前缀
  await app.listen(3000);
}
bootstrap().then();
