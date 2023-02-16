<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);

interface Props {
  modelValue?: string | number;
  items?: Record<string, unknow>[];
  itemKeyField?: string;
  itemLabelField?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  items: [],
  itemKeyField: 'key',
  itemLabelField: 'label',
});

const content = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const selectedItem = computed(() =>
  (props.items ?? []).find((item) => item[props.itemKeyField] === content.value)
);

const firstItem = computed(() => (props.items ?? [])[0] ?? null);

const selectRef = ref();

const onClick = () => {
  selectRef.click();
};
</script>

<template>
  <div class="relative group">
    <select
      v-model="content"
      ref="selectRef"
      class="peer appearance-none absolute inset-0 opacity-0 cursor-pointer"
    >
      <option
        v-for="(item, index) of props.items"
        :key="item[props.itemKeyField] || index"
        :selected="
          item[props.itemKeyField] && item[props.itemKeyField] === content
        "
        :value="item[props.itemKeyField || 'id'] ?? index"
      >
        {{ item[props.itemLabelField] }}
      </option>
    </select>

    <button
      class="
        w-full
        h-9
        flex
        gap-1.5
        items-center
        pointer-events-none
        px-3
        border border-gray-700
        group-hover:border-gray-500 group-hover:shadow group-hover:text-gray-700
        rounded-3xl
        outline outline-2 outline-offset-0 outline-stone-700/0
        peer-focus-visible:outline-stone-700/50
        motion-safe:transition
        duration-300
      "
      tabindex="-1"
    >
      <slot>
        {{
          (selectedItem ?? {})[props.itemLabelField] ??
          (firstItem ?? {})[props.itemLabelField] ??
          ''
        }}
      </slot>

      <IconAngleDown class="w-5 h-5 text-gray-500 ml-0.5 -mr-1" />
    </button>
  </div>
</template>
