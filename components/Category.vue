<script setup lang="ts">
interface Props {
  autoSuggested?: boolean;
  color?: string;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  autoSuggested: false,
  color: '',
  name: '',
});

const backgroundClass = computed(() =>
  !props.name
    ? 'bg-white'
    : {
        lime: 'bg-lime-200',
        orange: 'bg-orange-200',
        purple: 'bg-purple-200',
        red: 'bg-red-200',
        sky: 'bg-sky-200',
        stone: 'bg-stone-300',
        yellow: 'bg-yellow-200',
      }[props.color] ?? 'bg-stone-300'
);

const borderClass = computed(() =>
  props.name ? '' : 'border border-gray-200'
);
</script>

<template>
  <span
    class="
      inline-grid
      grid-flow-col
      gap-1
      items-center
      text-xs
      rounded-sm
      px-1.5
      h-7
    "
    :class="[backgroundClass, borderClass]"
  >
    <span v-if="props.autoSuggested" title="Auto suggested">
      <IconBolt class="text-black/50 w-4 h-4" />
    </span>

    <span class="truncate min-w-0 leading-normal">
      {{ props.name || 'Uncategorized' }}
    </span>
  </span>
</template>
