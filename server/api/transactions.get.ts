import { transactions } from '../mock/transactions';
import { delay } from '../utils/delay';

export default defineEventHandler(async (event) => {
  let query = getQuery(event);
  let items = transactions;

  if (query.search) {
    const search = query.search.toString().toLowerCase();
    items = items.filter(
      (item) =>
        item.counterparty?.name?.toLowerCase()?.includes(search) ||
        item.reference?.toLowerCase()?.includes(search) ||
        item.category?.name?.toLowerCase()?.includes(search)
    );
  }

  if (query.status) {
    items = items.filter((item) => item.status === query.status);
  }

  // QUESTION 2: Filter transactions by `query.billStatus`, if provided.
  // Optional, if Question 3 is solved instead.
  /*
   * If provided, the possible values and conditions as follows:
   *  'NOT_REQUIRED', transaction `isBillNotRequired` is `true`;
   *  'ADDED', transaction `isBillNotRequired` is `false` and `billURL` is not empty;
   *  'MISSING', transaction `isBillNotRequired` is `false` and `billURL` is empty.
   */

  // TODO: QUESTION 2.

  // QUESTION 3: Sort the transactions, depending on having `query.sort` or not.
  // Optional, if Question 2 is solved instead.
  /*
   * If provided, the possible values and sorting criteria as follows:
   *  'DATE_ASC', transaction `date` ascending (oldest transactions first);
   *  'AMOUNT_DESC', transaction `amount` descending (larger amounts first);
   *  'AMOUNT_ASC', tranasction `amount` ascending (smaller amounts first).
   *
   * If not provided, transaction `date` descending (newest transactions first);
   */

  // TODO: QUESTION 3.

  let total = items.length;
  let skip = query.skip ? Number(query.skip) : 0;
  let size = query.size ? Number(query.size) : 30;

  // QUESTION 4: Allow infinite scrolling pagination, based on `query.skip` and `query.size`.
  /*
   * If `query.skip` provided, number of items to discard.
   * If `query.size` provided, number of items to take after the discarded ones.
   */

  // TODO: QUESTION 4.

  await delay();
  return { total, items };
});
