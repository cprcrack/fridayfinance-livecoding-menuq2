<script setup lang="ts">
import { currencies } from '~/server/mock/currencies';

interface Props {
  canceled?: boolean;
  currency?: string;
  value?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  canceled: false,
  currency: '',
  value: '',
});

const currency = computed(() =>
  currencies.find((c) => c.code === props.currency)
);

const valueAsString = computed(() =>
  new Intl.NumberFormat('en-GB').format(props.value ?? 0)
);
</script>

<template>
  <span class="inline-flex flex-wrap gap-1 items-center justify-end">
    <span
      :class="{ 'text-gray-500 line-through': props.canceled }"
      :title="props.canceled ? 'Transaction canceled' : undefined"
    >
      {{ valueAsString }}
    </span>
    <span v-if="props.currency" :title="currency?.name" class="mt-1.5">
      {{ currency?.symbol || props.currency }}
    </span>
  </span>
</template>
