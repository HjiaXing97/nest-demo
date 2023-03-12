import { Random } from 'mockjs';
import create from '../helpr';

export default async function user() {
  await create(20, async (prisma) => {
    await prisma.user.create({
      data: {
        email: Random.email(),
        username: Random.cname(),
        password: Random.string(),
        github: Random.url()
      }
    });
  });
}
