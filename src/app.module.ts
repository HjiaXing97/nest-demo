import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { ArticleModule } from 'modules/article/article.module';
import { PrismaModule } from 'modules/prisma/prisma.module';
import { CategoryModule } from 'modules/category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ArticleModule,
    PrismaModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
