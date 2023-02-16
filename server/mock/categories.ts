export const categories = [
  {
    id: '17ccc939-1216-42d7-89d8-483c07553e99',
    name: 'REVENUE',
    type: 'INFLOW',
    color: 'lime',
    parentId: null,
    children: null,
  },
  {
    id: '35f7981b-e477-4319-a54e-8a4fd1b95ca9',
    name: 'VENDORS',
    type: 'OUTFLOW',
    color: 'red',
    parentId: null,
    children: [
      {
        id: '5930b27d-9463-4eae-ba55-9d23a43889ef',
        name: 'INVENTORY',
        type: 'OUTFLOW',
        color: 'red',
        parentId: '35f7981b-e477-4319-a54e-8a4fd1b95ca9',
      },
    ],
  },
  {
    id: 'dcd28fa8-493c-4d4d-9d09-68b7244d9e1b',
    name: 'FINANCING INCOME',
    type: 'INFLOW',
    color: 'stone',
    parentId: null,
    children: [
      {
        id: '77a98687-f3f5-490b-9f89-082f3707830b',
        name: 'EQUITY INVESTMENT',
        type: 'INFLOW',
        color: 'stone',
        parentId: 'dcd28fa8-493c-4d4d-9d09-68b7244d9e1b',
      },
      {
        id: '3688186d-d865-416d-bac7-ce7e124059f1',
        name: 'DEBT INVESTMENT',
        type: 'INFLOW',
        color: 'stone',
        parentId: 'dcd28fa8-493c-4d4d-9d09-68b7244d9e1b',
      },
    ],
  },
  {
    id: 'd61aad30-b637-4caa-8afc-7acf8c402794',
    name: 'PAYROLL AND CONSULTANTS',
    type: 'OUTFLOW',
    color: 'yellow',
    parentId: null,
    children: null,
  },
  {
    id: 'f4c53b63-81f1-452c-997d-433a243b9ed2',
    name: 'CONTRACTORS',
    type: 'OUTFLOW',
    color: 'yellow',
    parentId: null,
    children: null,
  },
  {
    id: 'be2e65db-7676-49e8-943b-9c738fef26db',
    name: 'SOCIAL SECURITY CONTRIBUTIONS',
    type: 'OUTFLOW',
    color: 'yellow',
    parentId: null,
    children: null,
  },
  {
    id: 'fda77659-90c7-45a6-b4a4-96cc70f4cf8b',
    name: 'SALARY TAXES',
    type: 'OUTFLOW',
    color: 'yellow',
    parentId: null,
    children: null,
  },
  {
    id: '75b711c5-8397-4ee8-a676-58df4cc5980d',
    name: 'TAX REFUND',
    type: 'INFLOW',
    color: 'sky',
    parentId: null,
    children: null,
  },
  {
    id: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
    name: 'OPERATING EXPENSES',
    type: 'OUTFLOW',
    color: 'orange',
    parentId: null,
    children: [
      {
        id: '6749dcf5-0915-4ad2-aeef-6e8254ca24ce',
        name: 'UTILITIES',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: 'd7354697-bf23-4f83-9534-a27239a4832d',
        name: 'RENT',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: '44f2dea5-4bcf-475d-a369-0f36fd447e3a',
        name: 'CHARGES OR FEES',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: 'dc185016-1811-4fa4-ba03-c87598f6ed04',
        name: 'OVERDRAFT FEES',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: 'df7b9267-f133-41ff-ab1e-6874ff25b0ff',
        name: 'OTHER EXPENSES',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: '52070d4c-e194-49da-83fd-194db92c2dc8',
        name: 'CHECK OUTFLOWS',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: 'd9400c5e-e7e0-4349-a3dd-eb12f0eec540',
        name: 'CREDIT CARD',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: '46774c89-fd6d-4b84-af69-abd70a65b41e',
        name: 'TRAVEL',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: '9fc8d444-965e-456f-8c68-8f7f4e584451',
        name: 'INSURANCE',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: 'ac04458c-cd8b-4c2a-b9f8-956ce3c84d51',
        name: 'LEGAL',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
      {
        id: 'a822272c-756e-475e-9670-06d622dd3fbb',
        name: 'POSTAGE',
        type: 'OUTFLOW',
        color: 'orange',
        parentId: '35e8f66f-1782-4d16-8220-a46a60ff5c99',
      },
    ],
  },
  {
    id: 'a6e8b93a-e8ea-4695-8cb6-026f6e02391d',
    name: 'REFUNDS',
    type: 'INFLOW',
    color: 'sky',
    parentId: null,
    children: null,
  },
  {
    id: 'a4ff2d87-7c99-41e1-afe8-10956bc6ff37',
    name: 'SALES AND MARKETING',
    type: 'OUTFLOW',
    color: 'purple',
    parentId: null,
    children: [
      {
        id: '0b9e7de0-6911-4ffe-94e4-b338d7c4639f',
        name: 'ADVERTISING',
        type: 'OUTFLOW',
        color: 'purple',
        parentId: 'a4ff2d87-7c99-41e1-afe8-10956bc6ff37',
      },
    ],
  },
  {
    id: '990607de-6cf4-4034-a971-81893f1d51af',
    name: 'SPECIAL INFLOWS',
    type: 'INFLOW',
    color: null,
    parentId: null,
    children: null,
  },
  {
    id: 'efcb2489-5516-438e-b38f-4356814aeff7',
    name: 'FINANCING EXPENSE',
    type: 'OUTFLOW',
    color: 'stone',
    parentId: null,
    children: [
      {
        id: 'b935fb5c-d209-4a8f-a87d-c5ff993a54fc',
        name: 'DEBT REPAYMENT',
        type: 'OUTFLOW',
        color: 'stone',
        parentId: 'efcb2489-5516-438e-b38f-4356814aeff7',
      },
      {
        id: 'de1aabbc-faf3-4eec-8edc-acf87aa6c8da',
        name: 'COMPANY INVESTMENTS',
        type: 'OUTFLOW',
        color: 'stone',
        parentId: 'efcb2489-5516-438e-b38f-4356814aeff7',
      },
    ],
  },
  {
    id: '5043db0e-4578-4694-a863-c3695c32685b',
    name: 'TAXES',
    type: 'OUTFLOW',
    color: 'stone',
    parentId: null,
    children: null,
  },
  {
    id: '8fdd2309-8480-41c0-a25a-4f20979f7ba4',
    name: 'SPECIAL OUTFLOWS',
    type: 'OUTFLOW',
    color: null,
    parentId: null,
    children: null,
  },
  {
    id: 'd7d959be-7f60-4e51-b1be-eaeebeb8dd09',
    name: 'INTERNAL TRANSFERS',
    type: null,
    color: null,
    parentId: null,
    children: null,
  },
];

// QUESTION 7: Convert the uppercase category names to a title case shape.
/*
 * All previous categories have something weird in common: Fully uppercase names.
 *
 * No one would like to feel our app is yelling to them, so we should convert these names
 * to a title case version, which means, 'Only Initials Should Be Uppercase'.
 *
 * Bonus: Connective words (the 'and' and the 'or' words), should be always in lowercase.
 */

const titleCase = (name: string) => {
  // TODO: QUESTION 7.
  return name;
};

export const flattenedCategories = [
  ...categories.map((c) => ({
    id: c.id,
    name: titleCase(c.name),
    type: c.type,
    color: c.color,
    parentId: c.parentId,
  })),
  ...categories
    .flatMap((c) => c.children ?? [])
    .map((c) => ({
      id: c.id,
      name: titleCase(c.name),
      type: c.type,
      color: c.color,
      parentId: c.parentId,
    })),
];
