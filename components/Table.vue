<script setup lang="ts">
const emit = defineEmits(['click', 'load-data']);

interface Column {
  key: string;
  title?: string;
  class?: string;
  style?: string;
}

interface Props {
  columns?: (string | Column)[];
  primaryKey?: string;
  rows?: Record<string, unknow>[];
  total?: number;
  totalOptimistic?: number;
  waiting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  columns: [],
  primaryKey: 'id',
  rows: [],
  total: 0,
  totalOptimistic: 30,
  waiting: false,
});

const rows = computed(() =>
  props.rows?.length
    ? props.rows
    : new Array(props.rows?.length || props.totalOptimistic).fill(null)
);

const rowKey = (...args) => {
  const row = args.length > 1 ? args[0] : null;
  const rowIndex = args[args.length - 1];
  return `row_${row ? row[props.primaryKey] || rowIndex : rowIndex}`;
};

const columnKey = (...args) => {
  const row = args.length > 3 ? args[0] : null;
  const rowIndex = args[args.length - 3];
  const column = args[args.length - 2];
  const columnIndex = args[args.length - 1];
  return `${rowKey(row, rowIndex)}_col_${
    column && typeof column === 'string' ? column : column?.key || columnIndex
  }`;
};

const columnAttribute = (column, columnIndex) =>
  `${
    column && typeof column === 'string' ? column : column?.key || columnIndex
  }`;

const rowGeneratedClass = (rowIndex) => ({
  'group motion-safe:transition duration-300': true,
  'hover:bg-gray-100/50': rowIndex < props.rows.length,
  'pointer-events-none': props.waiting,
  'cursor-pointer outline outline-2 -outline-offset-2 outline-stone-700/0 focus-visible:outline-stone-700/50':
    !props.waiting,
  'border-t border-gray-200': rowIndex > 0,
  'max-md:grid max-md:w-full max-md:auto-rows-min': true,
});

const columnGeneratedClass = (columnIndex) => ({
  'relative align-middle leading-none md:h-[4.5rem] py-2': true,
  'pr-2 text-right max-md:justify-end':
    columnIndex === props.columns.length - 1,
  'pl-2 max-md:col-span-full max-md:w-full': columnIndex === 0,
  'max-md:row-start-2 max-md:w-full max-md:flex max-md:items-center':
    columnIndex !== 0,
});

const columnGeneratedStyle = (column, columnIndex) => ({
  'grid-column':
    columnIndex === 0 ? `1 / ${props.columns.length - 1}` : undefined,
  ...(column.style ?? {}),
});

const containerRef = ref();
const loadingRowRef = ref();
const isLoadingRowVisible = ref(false);

useIntersectionObserver(loadingRowRef, ([{ isIntersecting }]) => {
  isLoadingRowVisible.value = isIntersecting && !props.waiting;
});

watch(
  isLoadingRowVisible,
  async (visible) => {
    if (visible && !props.waiting) {
      await nextTick();
      emit('load-data', props.rows?.length ?? 0);
    }
  },
  { immediate: true }
);

const { y: scrollTop } = useScroll(containerRef);

watch(
  () => props.rows.length,
  (length) => {
    if (length < props.totalOptimistic) {
      scrollTop.value = 0;
    }
  }
);

const onClick = (row) => {
  if (props.waiting) return;
  emit('click', row);
};
</script>

<template>
  <div
    ref="containerRef"
    class="
      scrollbar-gutter
      flex
      relative
      flex-col
      w-full
      text-sm
      min-h-0
      max-h-full
      gap-2
      border-y border-gray-200
      overflow-auto
    "
  >
    <div
      v-if="!props.columns?.length || (!props.waiting && !props.rows?.length)"
      class="grid place-items-center p-6"
    >
      <p class="flex items-center gap-1 text-sm text-gray-400">
        <IconParagraph class="w-5 h-5" />
        No data to show
      </p>
    </div>

    <table v-else class="w-full table-fixed border-collapse border-spacing-0">
      <thead>
        <tr :class="rowGeneratedClass(-1)">
          <th
            v-for="(column, columnIndex) of props.columns"
            :key="`th-${columnIndex}`"
            class="p-0 h-0"
            :class="column.class"
            :style="column.style"
          />
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, rowIndex) of rows"
          :key="rowKey(row, rowIndex)"
          :class="rowGeneratedClass(rowIndex)"
          :tabindex="props.waiting ? undefined : 0"
          @click="onClick(row)"
          @keypress.enter="onClick(row)"
        >
          <td
            v-for="(column, columnIndex) of props.columns"
            :key="columnKey(row, rowIndex, column, columnIndex)"
            :class="[columnGeneratedClass(columnIndex), column.class]"
            :style="columnGeneratedStyle(column, columnIndex)"
          >
            <slot
              v-if="props.waiting && !row"
              :name="`loading-${columnAttribute(column, columnIndex)}`"
            >
              <Skeleton
                class="h-3.5 rounded-sm"
                :class="{
                  'w-10/12': rowIndex % 5 === 0 || rowIndex % 3 === 0,
                  'w-9/12': rowIndex % 5 !== 0 && rowIndex % 3 !== 0,
                }"
              />
            </slot>

            <slot
              v-else
              :row="row"
              :name="`row-${columnAttribute(column, columnIndex)}`"
            >
              {{ row[columnAttribute(column, columnIndex)] }}
            </slot>
          </td>
        </tr>

        <tr
          v-if="props.rows?.length && props.rows.length < total"
          :key="rowKey(props.rows.length)"
          ref="loadingRowRef"
          :class="rowGeneratedClass(props.rows.length)"
        >
          <td
            v-for="(column, columnIndex) of props.columns"
            :key="columnKey(props.rows.length, column, columnIndex)"
            :class="[columnGeneratedClass(columnIndex), column.class]"
            :style="columnGeneratedStyle(column, columnIndex)"
          >
            <slot :name="`loading-${columnAttribute(column, columnIndex)}`">
              <Skeleton class="w-10/12 h-3.5 rounded-sm" />
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
