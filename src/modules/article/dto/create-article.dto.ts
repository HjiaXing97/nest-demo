import { IsNotEmpty } from 'class-validator';
import IsArticleExistsRule from 'modules/article/rules/isArticleExists.rule';

export class CreateArticleDto {
  @IsNotEmpty({ message: '文章标题不能为空' })
  @IsArticleExistsRule('article', { message: '文章标题已存在' })
  title: string;
  @IsNotEmpty({ message: '文章内容不能为空' })
  content: string;
  @IsNotEmpty({ message: '请选择栏目' })
  categoryId: number;
}
