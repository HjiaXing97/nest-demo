import create from '../helpr';
import { Random } from 'mockjs';

export default function category() {
  create(5, async (prisma) => {
    await prisma.category.create({
      data: {
        title: Random.ctitle()
      }
    });
  });
}
