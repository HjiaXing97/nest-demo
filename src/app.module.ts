import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { ArticleModule } from 'modules/article/article.module';
import { PrismaModule } from 'modules/prisma/prisma.module';
import { CategoryModule } from 'modules/category/category.module';

@Module({
  imports: [AuthModule, ArticleModule, PrismaModule, CategoryModule],
  controllers: [],
  providers: []
})
export class AppModule {}
