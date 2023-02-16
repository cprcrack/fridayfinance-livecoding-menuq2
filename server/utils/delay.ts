import { faker } from '@faker-js/faker';

export const delay = (milliseconds?: number) =>
  new Promise((resolve) =>
    setTimeout(
      resolve,
      milliseconds ?? faker.datatype.number({ min: 400, max: 1200 })
    )
  );
