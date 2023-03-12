import user from './seeds/user';
import category from './seeds/category';

async function run() {
  await user();
  await category();
}

run().then(() => {});
