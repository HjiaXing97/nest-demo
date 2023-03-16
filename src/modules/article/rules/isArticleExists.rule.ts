import { registerDecorator, ValidationOptions } from 'class-validator';
import { PrismaClient } from '@prisma/client';

export default function (table: string, validateOptions: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isArticleExistsRule',
      propertyName: propertyName,
      constraints: [table],
      target: object.constructor,
      options: validateOptions,
      validator: {
        async validate(value: any): Promise<boolean> {
          const prisma = new PrismaClient();
          const article = await prisma.article.findUnique({
            where: {
              [propertyName]: value
            }
          });
          return !Boolean(article);
        }
      }
    });
  };
}
