<template>
  <div class="bg-blue-dark">
    <div class="container space-y-4 text-white py-8 pb-16 font-light">
      <h2 class="text-xl">Notes</h2>
      <div
        class="relative lg:h-auto overflow-hidden"
        :class="{ 'h-40': !open && extend }"
      >
        <slot />
        <div
          v-if="!open && extend"
          class="bg-gradient-to-t from-blue-dark to-transparent h-24 absolute inset-x-0 bottom-0 lg:hidden"
        ></div>
      </div>
      <ui-button
        v-if="extend"
        :icons="open ? 'arrow-up' : 'arrow-down'"
        reverse
        class="text-yellow w-full lg:hidden"
        size="sm"
        @click="open = !open"
        >{{ label }}</ui-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    extend: Boolean,
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    label() {
      return this.open ? 'Close' : 'Show more';
    },
  },
};
</script>
