<script setup lang="ts">
interface Props {
  contentClass?: string;
  details?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  contentClass: 'overflow-hidden',
  details: '',
  title: '',
});
</script>

<template>
  <section
    class="
      flex flex-col
      w-full
      min-h-0
      max-h-full
      overflow-hidden
      bg-white
      rounded
      shadow-sm
    "
  >
    <header
      v-if="props.title || props.details"
      class="px-6 pt-6 flex gap-4 justify-between items-center"
    >
      <h1 v-if="props.title" class="font-bold">
        {{ props.title }}
      </h1>

      <span v-if="props.details" class="text-sm text-gray-500 text-right">
        {{ props.details }}
      </span>
    </header>

    <div
      class="flex flex-col min-h-0 max-h-full p-6"
      :class="props.contentClass"
    >
      <slot />
    </div>
  </section>
</template>
