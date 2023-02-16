import { faker } from '@faker-js/faker';
import { staticTransactions } from './static-transactions';
import { flattenedCategories } from './categories';
import { currencies } from './currencies';

const TRANSACTIONS_LENGTH = 200;

faker.seed(2023);

const today = new Date();
const minDate = new Date().setFullYear(today.getFullYear() - 3);
const maxDate = new Date(2022, 8, 4).getTime();

export const transactions = [
  ...staticTransactions,
  ...Array(TRANSACTIONS_LENGTH - staticTransactions.length),
].map((t) => {
  if (t?.id) return t;

  const reference =
    faker.datatype.number({ min: 1, max: 10 }) > 2
      ? faker.datatype.boolean()
        ? faker.datatype.string()
        : faker.lorem
            .words(faker.datatype.number({ min: 2, max: 4 }))
            .replace(/\b\w/g, (w) => w.charAt(0).toUpperCase() + w.slice(1))
      : null;

  const isCounterpartyBusiness = faker.datatype.number({ min: 1, max: 10 }) > 4;

  const counterparty =
    faker.datatype.number({ min: 1, max: 10 }) > 3
      ? {
          id: faker.datatype.uuid(),
          name: isCounterpartyBusiness
            ? faker.company.name()
            : faker.name.fullName(),
          IBAN:
            faker.datatype.number({ min: 1, max: 10 }) > 6
              ? faker.finance.iban()
              : null,
          logoURL: faker.datatype.boolean() ? faker.image.avatar() : null,
          isBusiness: isCounterpartyBusiness,
        }
      : null;

  const category =
    faker.datatype.number({ min: 1, max: 10 }) > 4
      ? {
          ...flattenedCategories[
            faker.datatype.number({
              min: 0,
              max: flattenedCategories.length - 1,
            })
          ],
        }
      : null;

  const responsible =
    faker.datatype.number({ min: 1, max: 10 }) > 6
      ? {
          id: faker.datatype.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          avatarURL:
            faker.datatype.number({ min: 1, max: 10 }) > 6
              ? faker.image.avatar()
              : null,
        }
      : null;

  const billURL = faker.datatype.boolean()
    ? faker.image.abstract(304, 228, true)
    : null;

  const date = faker.datatype.datetime({ min: minDate, max: maxDate });

  return {
    id: faker.datatype.uuid(),
    reference,
    counterparty,
    category,
    isCategoryAddedByUser: category
      ? faker.datatype.number({ min: 1, max: 10 }) > 7
      : null,
    date: date.toISOString(),
    amount: parseFloat(faker.finance.amount(-9999999, 9999999)),
    currency: faker.helpers.arrayElement(
      currencies.map((currency) => currency.code)
    ),
    responsible,
    billURL,
    isBillNotRequired: !billURL ? faker.datatype.boolean() : false,
    status:
      date > today
        ? 'PENDING'
        : faker.datatype.number({ min: 1, max: 10 }) > 2
        ? 'BOOKED'
        : 'CANCELED',
  };
});
