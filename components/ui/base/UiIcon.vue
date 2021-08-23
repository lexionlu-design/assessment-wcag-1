<template>
  <compoment
    :is="currentIcon || loader"
    :class="dimension"
    class="flex-shrink-0"
    :aria-hidden="hidden"
  />
</template>

<script>
const dimensions = {
  none: '',
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8 ',
  xl: 'w-10 h-10',
  '2xl': 'w-12 h-12',
  '3xl': 'w-16 h-16',
  '4xl': 'w-20 h-20',
};

export default {
  props: {
    name: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: 'none',
    },
    path: {
      type: String,
      default: 'svg',
    },
    hidden: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentIcon: undefined,
    };
  },
  computed: {
    // assign width and height of the icon
    dimension() {
      return dimensions[this.size];
    },

    // dynamic component loader
    loader() {
      return () => import(`@/assets/icons/${this.path}/${this.name}.svg`);
    },
  },
  watch: {
    // load new icon if name change
    name(value) {
      this.currentIcon = () => this.loader();
    },
  },
};
</script>
