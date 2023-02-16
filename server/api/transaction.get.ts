import { transactions } from '../mock/transactions';
import { delay } from '../utils/delay';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  await delay();
  return (
    transactions.find((transaction) => transaction.id === query.id) ?? null
  );
});
