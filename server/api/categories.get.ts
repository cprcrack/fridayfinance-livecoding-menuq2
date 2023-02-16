import { flattenedCategories } from '../mock/categories';
import { delay } from '../utils/delay';

export default defineEventHandler(async () => {
  await delay();
  return {
    total: flattenedCategories.length,
    items: flattenedCategories,
  };
});
