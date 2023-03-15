import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { PrismaClient } from '@prisma/client';

/**
 * @param table  表名
 * @param validationOptions  配置项
 */
function IsNotExistsRule(table: string, validationOptions: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    // @ts-ignore
    registerDecorator({
      name: 'IsNotExistsRule',
      target: object.constructor,
      propertyName: propertyName, //验证字段
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
          const prisma = new PrismaClient();
          const user = await prisma.user.findFirst({
            where: {
              [propertyName]: validationArguments.value
            }
          });
          return !Boolean(user);
        }
      }
    });
  };
}

export default IsNotExistsRule;
