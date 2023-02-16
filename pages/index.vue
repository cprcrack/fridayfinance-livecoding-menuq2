<script setup lang="ts">
// QUESTION 1: "Spot the difference", the game. Find up to 7 layout inconsistencies.
/*
 * This question is about investigating with high attention to details this page's layout,
 * in comparison to the Figma's design at https://images2.imgbox.com/ec/5f/KxozVbz7_o.png.
 */

const columns = [
  { key: 'main-info' },
  { class: 'px-2 w-2/6 md:px-4', key: 'category' },
  { class: 'max-sm:hidden px-4 w-20 lg:w-24', key: 'responsible' },
  { class: 'px-4 w-16 lg:w-20', key: 'bill' },
  { class: 'w-36', key: 'amount' },
];

const statuses = [
  { key: '', label: 'All' },
  { key: 'BOOKED', label: 'Booked' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'CANCELED', label: 'Canceled' },
];

const billStatuses = [
  { key: '', label: 'All' },
  { key: 'NOT_REQUIRED', label: 'Not required' },
  { key: 'ADDED', label: 'Added' },
  { key: 'MISSING', label: 'Missing' },
];

const sorts = [
  { key: '', label: 'Newest first' },
  { key: 'DATE_ASC', label: 'Oldest first' },
  { key: 'AMOUNT_DESC', label: 'Amount descending' },
  { key: 'AMOUNT_ASC', label: 'Amount ascending' },
];

const rows = ref([]);

const skip = ref(0);
const size = ref(15);

const DEBOUNCE_DELAY = 500;
const search = refDebounced(ref(''), DEBOUNCE_DELAY);
const status = refDebounced(ref(''), DEBOUNCE_DELAY);
const billStatus = refDebounced(ref(''), DEBOUNCE_DELAY);
const sort = refDebounced(ref(''), DEBOUNCE_DELAY);

const { pending, data, refresh } = useFetch(
  () =>
    `/api/transactions?skip=${skip.value}&size=${size.value}&search=${search.value}&status=${status.value}&billStatus=${billStatus.value}&sort=${sort.value}`
);

watch(data, () => {
  if (data.value?.items) {
    rows.value.push(...data.value.items);
  }
});

const total = computed(() => unref(data)?.total ?? 0);

const restart = () => {
  skip.value = 0;
  rows.value = [];
};

watch(search, restart);
watch(status, restart);
watch(billStatus, restart);
watch(sort, restart);

const onClick = (row) => {
  const router = useRouter();
  router.push({ path: `/${row.id}` });
};

// QUESTION 6: Load data during infinite scrolling using the table's `load-data` event.
/*
 * Even if the `skip` and `size` query params are handled properly by the server-side,
 * considering you already solved the Question 4, this page still lacks the well desired
 * infinite scrolling while scrolling the table.
 *
 * We suggest you to take a look at the emits of the `Table.vue` component, then write
 * in this page, the proper binding between the event and the method below. Finally, force
 * the refresh of the transactions list when this method is called.
 */

const onLoadMore = (length) => {
  skip.value = length;
  // TODO: QUESTION 6.
};
</script>

<template>
  <Panel title="Transactions">
    <div
      class="
        flex
        gap-x-1 gap-y-1
        md:gap-x-2
        flex-wrap
        items-center
        justify-end
        mb-3
      "
    >
      <FieldSearch v-model="search" class="flex-auto w-[24rem] md:mr-1" />

      <ButtonSelect v-model="status" :items="statuses" class="grow-0 shrink-0">
        <IconBookmark class="w-5 h-5" />
        <span>Status</span>
      </ButtonSelect>

      <ButtonSelect
        v-model="billStatus"
        :items="billStatuses"
        class="grow-0 shrink-0"
      >
        <IconIncomingCall class="w-5 h-5" />
        <span>Bill</span>
      </ButtonSelect>

      <ButtonSelect v-model="sort" :items="sorts" class="grow-0 shrink-0">
        <IconSort class="w-5 h-5" />
        <span>Sort</span>
      </ButtonSelect>
    </div>

    <div
      v-if="status || billStatus || sort"
      class="flex gap-x-1 gap-y-1 md:gap-x-2 flex-wrap items-center mb-3"
    >
      <Filter
        v-model="status"
        :label="statuses.find((item) => item.key === status)?.label"
      >
        Status
      </Filter>

      <Filter
        v-model="billStatus"
        :label="billStatuses.find((item) => item.key === billStatus)?.label"
      >
        Bill status
      </Filter>

      <Filter
        v-model="sort"
        :label="sorts.find((item) => item.key === sort)?.label"
      >
        Sorted by
      </Filter>
    </div>

    <Table
      :columns="columns"
      :rows="rows"
      :total="total"
      :total-optimistic="size"
      :waiting="pending"
      @click="onClick"
    >
      <template #row-main-info="{ row }">
        <div
          class="
            grid grid-rows-3
            grid-cols-[2rem_1fr]
            gap-x-3 gap-y-1
            items-center
            truncate
          "
        >
          <Avatar
            :type="
              row.counterparty && !row.counterparty.isBusiness
                ? 'person'
                : 'merchant'
            "
            :src="row.counterparty?.logoURL"
            :name="row.counterparty?.name"
            class="row-span-3"
          />

          <span
            class="truncate leading-4"
            :class="{ 'text-gray-400': !row.counterparty?.name }"
          >
            {{ row.counterparty?.name || 'Undefined' }}
          </span>

          <span
            class="
              inline-flex
              items-center
              gap-1
              truncate
              leading-4
              text-gray-500
            "
          >
            <span
              v-if="row.status === 'PENDING'"
              title="Pending"
              class="-my-px"
            >
              <IconClock class="text-gray-400 w-4 h-4" />
            </span>

            {{ new Intl.DateTimeFormat('en-GB').format(new Date(row.date)) }}
          </span>

          <span
            class="truncate leading-4"
            :class="{
              'text-gray-400': !row.reference,
              'text-gray-500': row.reference,
            }"
          >
            {{ row.reference || 'No reference provided' }}
          </span>
        </div>
      </template>

      <template #loading-main-info>
        <div
          class="
            grid grid-rows-3
            grid-cols-[2rem_1fr]
            gap-x-3 gap-y-1
            items-center
            truncate
          "
        >
          <Skeleton class="w-8 h-8 rounded-full row-span-3" />

          <Skeleton
            class="h-4 rounded-sm"
            :class="Math.random() > 0.5 ? 'w-3/5' : 'w-4/5'"
          />
          <Skeleton class="w-20 h-4 rounded-sm" />
          <Skeleton
            class="h-4 rounded-sm"
            :class="Math.random() > 0.5 ? 'w-2/5' : 'w-3/5'"
          />
        </div>
      </template>

      <template #row-category="{ row }">
        <Category
          :auto-suggested="row.isCategoryAddedByUser === false"
          :color="row.category?.color"
          :name="row.category?.name"
        />
      </template>

      <template #loading-category>
        <Skeleton
          class="h-7 rounded-sm"
          :class="Math.random() > 0.5 ? 'w-2/5' : 'w-3/5'"
        />
      </template>

      <template #row-responsible="{ row }">
        <Avatar
          v-if="row.responsible"
          :src="row.responsible.avatarURL"
          :name="
            `${row.responsible.firstName || ''} ${
              row.responsible.lastName || ''
            }`.trim()
          "
        />
      </template>

      <template #loading-responsible>
        <Skeleton class="w-8 h-8 rounded-full" />
      </template>

      <template #row-bill="{ row }">
        <span v-if="row.isBillNotRequired" title="Bill not required">
          <IconFileSlash class="w-4 h-4 text-stone-500/90" />
        </span>

        <span v-else-if="row.billURL" title="Bill added">
          <IconReceipt class="w-4 h-4 text-gray-500/70" />
        </span>

        <span v-else title="Bill missing">
          <IconFileQuestion class="w-4 h-4 text-red-400/80" />
        </span>
      </template>

      <template #loading-bill>
        <Skeleton class="w-4 h-4 rounded-sm" />
      </template>

      <template #row-amount="{ row }">
        <Amount
          :canceled="row.status === 'CANCELED'"
          :currency="row.currency"
          :value="row.amount"
        />
      </template>
    </Table>
  </Panel>
</template>
