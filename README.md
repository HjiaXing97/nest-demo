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

###生成测试数据

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
