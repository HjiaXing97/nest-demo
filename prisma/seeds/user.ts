import { Random } from 'mockjs';
import create from '../helpr';

function user() {
  create(20, async (prisma) => {
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

export default user;
