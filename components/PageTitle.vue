<template>
  <div class="container pb-4 pt-8 space-y-2">
    <div class="space-y-1">
      <ui-button
        v-if="backable"
        icons="back"
        space="xs"
        :sr-only="!backable.label"
        size="sm"
        class="text-yellow"
        @click="$emit('back')"
        >{{ backable.label || 'Back' }}</ui-button
      >
      <h1 class="text-3xl text-white">{{ title }}</h1>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined,
    },
    backable: {
      type: [Boolean, Object],
      default: false,
    },
  },
};
</script>
