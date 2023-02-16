<script setup lang="ts">
interface Props {
  name?: string;
  src?: string;
  type?: 'person' | 'merchant';
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  src: '',
  type: 'person',
});

const backgroundClass = computed(() => {
  if (props.src) {
    return 'bg-white';
  } else if (initials.value) {
    return 'bg-gray-500';
  } else {
    return 'bg-gray-50';
  }
});

const name = computed(() => {
  if (!props.name || typeof props.name !== 'string') return '';

  const isEmoji = /\p{Extended_Pictographic}/u;
  const isSpecialCharacter = /[!@#$%¬~^&*()_+\-=[\]{};':"\\|,.<>/?\d]+/;

  return [...props.name]
    .filter((char) => !isEmoji.test(char) && !isSpecialCharacter.test(char))
    .join('');
});

const initials = computed(() => {
  if (props.type !== 'person') return '';

  const words = name.value
    ? name.value
        .toUpperCase()
        .split(' ')
        .filter((word) => !!word)
    : '';

  if (words.length > 1) {
    return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`;
  } else if (words.length === 1) {
    return name.value.charAt(0);
  } else {
    return '';
  }
});
</script>

<template>
  <picture
    class="
      relative
      grid
      place-items-center
      overflow-hidden
      grow-0
      shrink-0
      w-8
      h-8
      border border-gray-200
      rounded-full
      text-xs
    "
    :class="backgroundClass"
    :title="name"
  >
    <img
      v-if="props.src"
      :src="props.src"
      :alt="name"
      :width="32"
      :height="32"
      class="object-cover absolute inset-0 w-full h-full rounded-full"
    />

    <span v-else-if="initials" class="text-gray-600 leading-snug">
      {{ initials }}
    </span>

    <IconUser v-else-if="type === 'person'" class="w-4 h-4 text-gray-400" />

    <IconBuilding v-else class="w-4 h-4 text-gray-400" />
  </picture>
</template>
