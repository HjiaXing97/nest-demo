import create from '../helpr';
import { Random } from 'mockjs';

export default async function article() {
  await create(50, async (prisma) => {
    await prisma.article.create({
      data: {
        title: Random.ctitle(),
        content: Random.cparagraph(10, 50),
        categoryId: Math.ceil(Math.random() * 5)
      }
    });
  });
}
