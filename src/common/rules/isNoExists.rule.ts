import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { PrismaClient } from '@prisma/client';

export default function (table: string, validate: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isNoExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validate,
      validator: {
        async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
          const prisma = new PrismaClient();

          const user = await prisma[table].findFirst({
            where: {
              [validationArguments.property]: value
            }
          });

          return !Boolean(user);
        }
      }
    });
  };
}
