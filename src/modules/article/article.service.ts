import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { SearchArticleDto } from 'modules/article/dto/search-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: createArticleDto.categoryId
      }
    });
  }

  async findAll({ categoryId, pageSize, curPage }: SearchArticleDto) {
    const data = await this.prisma.article.findMany({
      skip: (curPage - 1) * pageSize, //列表起始-结束
      take: pageSize, //页码
      where: {
        categoryId
      }
    });
    const total = await this.prisma.article.count({
      where: {
        categoryId
      }
    });
    return {
      data,
      pageInfo: {
        curPage,
        pageSize,
        total,
        totalPage: Math.ceil(total / pageSize)
      }
    };
  }

  async findOne(id: number) {
    return await this.prisma.article.findFirst({
      where: { id }
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.prisma.article.update({
      where: {
        id
      },
      data: updateArticleDto
    });
  }

  async remove(id: number) {
    return await this.prisma.article.delete({
      where: { id }
    });
  }
}
