### 安装primsa

1. pnpm add prisma-binding @prisma/client mockjs argon2

2. pnpm add -D prisma typescript @types/node @types/mockjs

### 初始化primsa工具

1. npx prisma init
2. 执行命令后会创建primsa文件夹和.env文件

### 修改primsa数据库配置

1. DATABASE_URL="sqlName://username:password@host:3306/database"

### 生成迁移文件

1. npx prisma migrate dev
2. 执行该命令后会创建迁移文件并在数据库中生产对应的表

### 生成测试数据

- 在prisma文件夹下创建seeds文件夹 创建seed.ts 文件
  ```javascript
        import user from './seeds/user';
        async function run() { 
            await user();
        };
        run().then(() => {});
  ```
- 在seeds文件夹下创建user文件用于mock数据
  ```javascript
       import { PrismaClient } from '@prisma/client';
        const prisma = new PrismaClient();
                    async function user() {
                    await prisma.user.create({
                    data: {
                    email: Random.email(),
                    username: Random.cname(),
                    password: Random.string(),
                    github: Random.url()
               }
           });
        }
        export default user;
  ```

- 在package.json 文件中创建命令
  ```
  "prisma": {
        "seed": "ts-node prisma/seed.ts"
     },
  ```
- 执行npx prisma db seed 命令就会自动创建mock数据

### 管道验证安装包

- class-transformer   数据转化
```ts
 import { plainToInstance } from 'class-transformer';
 //通过plainToInstance方法将数据进行转化
 const obj = plainToInstance(metadata.metatype, value);
```
- class-validator   数据验证
```ts
import { IsNotEmpty } from 'class-validator';

export default class CreateArticleDto {
  @IsNotEmpty() //非空判断
  title: string;
  @IsNotEmpty()
  content: string;
}
```

### 自定义校验规则

- 创建一个规则校验文件
```ts
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
class IsConfirmedRule implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    // 返回true校验成功，否则校验失败
    return value === validationArguments.object['password'];
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return '对比失败';
  }
}

export default IsConfirmedRule;

```

- 创建一个校验dto类

```ts
export class registerDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  @IsNotEmpty({ message: '密码' })
  password: string;
  @IsNotEmpty({ message: '确认密码' })
  @Validate(IsConfirmedRule)  //使用自定义校验
  password_confirmed: string;
}
```

### 使用装饰器进行自定义验证

- 创建一个装饰器验证函数

```ts
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

```

- 在校验类中使用该装饰器
```ts
export class registerDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @isNotExistsRule('user', { message: '用户已存在' })  //使用自定义装饰器
  username: string;
  @IsNotEmpty({ message: '密码' })
  password: string;
  @IsNotEmpty({ message: '确认密码' })
  @Validate(IsConfirmedRule)
  password_confirmed: string;
}

```