import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content
      }
    });
  }

  async findAll(curPage = 1, pageSize = 10) {
    const data = await this.prisma.article.findMany({
      skip: (curPage - 1) * pageSize, //列表起始-结束
      take: pageSize //页码
    });
    const total = await this.prisma.article.count();
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

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  async remove(id: number) {
    return await this.prisma.article.delete({
      where: { id }
    });
  }
}
