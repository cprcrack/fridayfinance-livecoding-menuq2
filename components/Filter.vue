<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);

interface Props {
  modelValue?: string | number;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
});

const content = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <button
    v-if="content"
    class="
      group
      flex
      items-center
      gap-1
      text-xs
      rounded-3xl
      px-3
      h-8
      border border-gray-400
      hover:border-gray-500 hover:shadow
      text-gray-500
      hover:text-gray-700
      outline outline-2
      -outline-offset-2
      outline-stone-700/0
      focus-visible:outline-stone-700/50
      motion-safe:transition
      duration-300
    "
    title="Clear"
    @click="content = ''"
  >
    <slot />

    <span v-if="props.label" class="text-black/95">
      {{ props.label ?? content }}
    </span>

    <IconMultiply
      class="w-3 h-3 ml-1 -mr-0.5 text-gray-500 group-hover:text-gray-700"
    />
  </button>
</template>
