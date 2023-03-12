import create from '../helpr';
import { Random } from 'mockjs';

export default function article() {
  create(50, async (prisma) => {
    await prisma.article.create({
      data: {
        title: Random.ctitle(),
        content: Random.cparagraph(10, 50),
        categoryId: 1
      }
    });
  });
}
