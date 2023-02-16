<script setup lang="ts">
// QUESTION 8: Review the `FieldSearch` component code, then suggest possible enhancements.
/*
 * Types annotations, Vue good practices, weird logical checks, excessive complex code without need...
 *
 * All these items can be good examples of what to detect during a code review, and this file may
 * (or may not) have some samples of these, as of any other possible code mistakes not listed above.
 * Maybe it's already an exceptional code and no enhancements are needed!
 *
 * Your responsibility is to study this code, review it and highlight zero to N possible enhancements.
 */

const emit = defineEmits(['update:modelValue']);

interface Props {
  disabled?: any;
  id?: any;
  modelValue?: any;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  id: '',
  modelValue: '',
});

const content = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const wrapperRef = ref();
const fieldRef = ref();
const isFocused = ref(false);

const uid = computed(
  () =>
    props.id ||
    self?.crypto?.randomUUID() ||
    performance?.now().toString().replace(/\D/g, '')
);

const isEmpty = computed(() => !content.value);

const isActionable = computed(() => !props.disabled);

const backgroundClass = computed(() => {
  if (props.disabled) return 'bg-gray-200';
  else return 'bg-white';
});

const borderClass = computed(() => {
  const hoverClass = 'hover:border-gray-700';

  if (props.disabled) return 'border border-gray-500';

  if (isEmpty.value && isActionable.value)
    return `border border-gray-400 ${hoverClass}`;

  if (isEmpty.value && !isActionable.value) return 'border border-gray-400';

  if (!isEmpty.value && isActionable.value)
    return `border border-gray-500 ${hoverClass}`;

  if (!isEmpty.value && !isActionable.value) return 'border border-gray-500';
});

const cursorClass = computed(() => {
  if (props.disabled) {
    return 'cursor-default';
  }

  return 'cursor-text';
});

const focusClass = computed(
  () =>
    'outline outline-2 -outline-offset-2 outline-stone-700/0 focus-within:outline-stone-700/50'
);

const foregroundClass = computed(() => {
  if (props.disabled) {
    return 'text-gray-400';
  }

  if (isEmpty.value) {
    return 'placeholder:text-gray-500 text-gray-500';
  }

  return 'placeholder:text-gray-500 text-black/95';
});

const overrideAutofillClass = computed(
  () => `
    [&:-webkit-autofill]:[-webkit-text-fill-color:theme('colors.black')]
    [&:-webkit-autofill]:[&::selection]:[-webkit-text-fill-color:theme('colors.white')]
    [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_theme('colors.white')_inset]
  `
);

const overrideSearchDefaultClass = computed(
  () => `
    [&::-webkit-search-decoration]:hidden
    [&::-webkit-search-cancel-button]:hidden
    [&::-webkit-search-results-button]:hidden
    [&::-webkit-search-results-decoration]:hidden
  `
);

function focus() {
  if (props.disabled) return;
  isFocused.value = true;
  fieldRef.value?.focus();
}

const onClick = (event) => {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    isFocused.value = false;
    return;
  }

  focus();
};

const onFocus = async (event) => {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    isFocused.value = false;
    return;
  }

  isFocused.value = true;
};

const onBlur = (event) => {
  isFocused.value = false;
};

const onInput = (event) => {
  content.value = event.target?.value ?? '';
};

watch(
  content,
  (value) => {
    if (fieldRef.value?.value !== undefined) {
      fieldRef.value.value = value;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    :id="`${uid}-container`"
    class="
      relative
      flex
      items-center
      gap-2
      min-h-[2.25rem]
      motion-safe:transition
      duration-300
      rounded-full
      px-3
      text-sm
    "
    :class="[
      backgroundClass,
      borderClass,
      cursorClass,
      focusClass,
      foregroundClass,
      props.classWrapper,
    ]"
    @click="onClick"
  >
    <div class="grow-0 shrink-0 flex items-center">
      <IconSearch class="grow-0 shrink-0 pointer-events-none w-4 h-4" />
    </div>

    <input
      :id="uid"
      ref="fieldRef"
      type="search"
      class="
        flex-auto
        h-full
        appearance-none
        bg-transparent
        outline-none
        border-none
        min-w-0 min-h-full
        leading-[2.125rem]
        pt-0
        pb-px
      "
      :class="[
        overrideAutofillClass,
        overrideSearchDefaultClass,
        cursorClass,
        foregroundClass,
      ]"
      :tabindex="props.disabled ? -1 : 0"
      placeholder="Search"
      :disabled="props.disabled"
      :value="content"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>
