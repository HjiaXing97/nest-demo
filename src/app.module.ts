import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { ArticleModule } from 'modules/article/article.module';
import { PrismaModule } from 'modules/prisma/prisma.module';

@Module({
  imports: [AuthModule, ArticleModule, PrismaModule],
  controllers: [],
  providers: []
})
export class AppModule {}
