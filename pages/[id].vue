<script setup lang="ts">
const route = useRoute();

// QUESTION 5: Get the transaction details by calling the backend endpoint.
/*
 * This page template is already created to show the transaction data with the
 * proper layout, or to show loading skeletons while the `pending` state is `true`.
 *
 * Now, remove the hard-coded `pending` constant and call the correct backend endpoint by
 * using the right Nuxt 3 method for it, which will already return the reactive `pending` state
 * and the reactive `data` object containing the results from the server-side.
 */

// TODO: QUESTION 5.
const pending = true;
</script>

<template>
  <Panel
    title="Transaction"
    :details="route.params.id"
    content-class="gap-4 grid grid-flow-col md:grid-cols-[2fr_1fr] items-start text-sm"
  >
    <div class="col-start-1 flex flex-col gap-3">
      <span class="flex gap-1.5 items-center">
        <span class="text-gray-500">Date:</span>

        <Skeleton v-if="pending" class="w-9/12 md:w-60 h-6 rounded-sm" />
        <span v-else class="text-base">
          {{
            new Intl.DateTimeFormat('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(data.date))
          }}
        </span>
      </span>

      <span class="flex gap-1.5 items-center">
        <span class="text-gray-500">Amount:</span>

        <Skeleton v-if="pending" class="w-7/12 md:w-40 h-6 rounded-sm" />
        <Amount
          v-else
          class="text-base"
          :canceled="data.status === 'CANCELED'"
          :currency="data.currency"
          :value="data.amount"
        />
      </span>

      <span class="flex gap-1.5 items-center">
        <span class="text-gray-500">Reference:</span>

        <Skeleton v-if="pending" class="w-8/12 md:w-72 h-6 rounded-sm" />
        <span
          v-else
          class="truncate text-base"
          :class="{
            'text-gray-400': !data.reference,
          }"
        >
          {{ data.reference || 'No reference provided' }}
        </span>
      </span>

      <span class="flex gap-1.5 items-center">
        <span class="text-gray-500">Counterparty:</span>

        <Skeleton
          v-if="pending"
          class="w-8 h-8 rounded-full grow-0 shrink-0 row-span-3"
        />
        <Avatar
          v-else
          :type="
            data.counterparty && !data.counterparty.isBusiness
              ? 'person'
              : 'merchant'
          "
          :src="data.counterparty?.logoURL"
          :name="data.counterparty?.name"
        />

        <Skeleton v-if="pending" class="w-full md:w-52 h-6 rounded-sm" />
        <span
          v-else
          class="truncate text-base"
          :class="{ 'text-gray-400': !data.counterparty?.name }"
        >
          {{ data.counterparty?.name || 'No counterparty provided' }}
        </span>
      </span>

      <span class="flex gap-1.5 items-center">
        <span class="text-gray-500">IBAN:</span>

        <Skeleton v-if="pending" class="w-7/12 md:w-40 h-6 rounded-sm" />
        <span
          v-else
          class="truncate text-base"
          :class="{
            'text-gray-400':
              !data.counterparty ||
              !data.counterparty.IBAN ||
              data.counterparty.isBusiness === false,
          }"
        >
          {{
            data.counterparty && data.counterparty.isBusiness === false
              ? 'Non business counterparty'
              : data.counterparty?.IBAN || 'Not provided'
          }}
        </span>
      </span>

      <span class="flex gap-1.5 items-center">
        <span class="text-gray-500">Responsible:</span>

        <Skeleton
          v-if="pending"
          class="w-8 h-8 rounded-full grow-0 shrink-0 row-span-3"
        />
        <Avatar
          v-else
          :src="data.responsible?.avatarURL"
          :name="
            `${data.responsible?.firstName || ''} ${
              data.responsible?.lastName || ''
            }`.trim() || null
          "
        />

        <Skeleton v-if="pending" class="w-full md:w-52 h-6 rounded-sm" />
        <span
          v-else
          class="truncate text-base"
          :class="{ 'text-gray-400': !data.responsible }"
        >
          {{
            `${data.responsible?.firstName || ''} ${
              data.responsible?.lastName || ''
            }`.trim() || 'No responsible tagged'
          }}
        </span>
      </span>

      <span class="flex gap-1.5 items-center">
        <span class="text-gray-500">Category:</span>

        <Skeleton v-if="pending" class="w-6/12 md:w-32 h-7 rounded-sm" />
        <Category
          v-else
          :auto-suggested="data.isCategoryAddedByUser === false"
          :color="data.category?.color"
          :name="data.category?.name"
        />
      </span>
    </div>

    <div class="col-start-1 md:col-start-2 flex flex-col gap-1">
      <Skeleton v-if="pending" class="w-2/5 h-5 rounded-sm" />
      <span v-else-if="data.isBillNotRequired" class="flex gap-1 items-center">
        <IconFileSlash class="w-4 h-4 text-stone-500/90" />
        Bill not required
      </span>
      <span v-else-if="data.billURL" class="flex gap-1 items-center">
        <IconReceipt class="w-4 h-4 text-gray-500/70" />
        Bill added
      </span>
      <span v-else class="flex gap-1 items-center">
        <IconFileQuestion class="w-4 h-4 text-red-400/80" />
        Bill missing
      </span>

      <div class="h-[14.25rem] rounded">
        <Skeleton v-if="pending" class="w-full h-full rounded" />
        <img
          v-else-if="data.billURL"
          :src="data.billURL"
          class="w-full h-full rounded object-cover border border-gray-500/25"
        />
        <div
          v-else
          class="grid place-items-center w-full h-full rounded border"
          :class="{
            'bg-stone-50 border-stone-200': data.isBillNotRequired,
            'bg-red-50 border-dashed border-red-200': !data.isBillNotRequired,
          }"
        >
          <IconFileSlash
            v-if="data.isBillNotRequired"
            class="w-8 h-8 text-stone-500/25"
          />
          <IconFileQuestion v-else class="w-8 h-8 text-red-200/75" />
        </div>
      </div>
    </div>
  </Panel>

  <RouterLink
    to="/"
    class="
      rounded-sm
      text-sm text-sky-800/80
      underline
      hover:text-sky-700
      motion-safe:transition
      duration-300
      outline outline-2 outline-offset-2 outline-stone-700/0
      focus-visible:outline-stone-700/50
    "
    >Back</RouterLink
  >
</template>
