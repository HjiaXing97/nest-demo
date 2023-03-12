import create from '../helpr';
import { Random } from 'mockjs';

export default async function category() {
  await create(5, async (prisma) => {
    await prisma.category.create({
      data: {
        title: Random.ctitle()
      }
    });
  });
}
