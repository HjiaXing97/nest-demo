import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //创建文章
  @Post()
  create(
    @Body()
    createArticleDto: CreateArticleDto
  ) {
    return this.articleService.create(createArticleDto);
  }
  //查询全部
  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }
  //根据id获取文章
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }
  //更新
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateArticleDto: UpdateArticleDto
  ) {
    return this.articleService.update(+id, updateArticleDto);
  }

  //删除文章
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
