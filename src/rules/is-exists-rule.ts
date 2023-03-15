import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { PrismaClient } from '@prisma/client';

export default function IsExistsRule(table: string, validationOptions: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
          const prisma = new PrismaClient();
          const info = await prisma.user.findFirst({
            where: {
              [propertyName]: validationArguments.value
            }
          });

          return Boolean(info);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return '';
        }
      }
    });
  };
}
