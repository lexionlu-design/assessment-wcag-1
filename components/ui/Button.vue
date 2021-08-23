<template>
  <component
    :is="type"
    :type="type === 'button' ? type : false"
    :href="href"
    :disabled="disabled"
    :to="to"
    :append="append"
    class="flex justify-between items-center"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span
      class="flex items-center w-full"
      :class="[
        classes,
        {
          'flex-row-reverse space-x-reverse': reverse,
        },
      ]"
    >
      <component
        :is="baseIcon"
        v-if="extractedIcons[0]"
        v-bind="{ name: extractedIcons[0], size: iconSize }"
      />
      <span
        v-if="$slots.default && !srOnly"
        :class="{ 'px-1': !extractedIcons[0] }"
      >
        <slot />
      </span>
    </span>
    <component
      :is="baseIcon"
      v-if="extractedIcons[1]"
      v-bind="{ name: extractedIcons[1], size: iconSize }"
    />
    <span v-if="$slots.default && srOnly" class="sr-only">
      <slot />
    </span>
  </component>
</template>

<script>
const variants = {
  base: 'hover:underline',
  gold:
    'rounded-full bg-gradient-to-t from-yellow-dark to-orange-darker text-white hover:text-blue',
  outline:
    'rounded-lg border border-brown-lighter hover:bg-brown-dark hover:text-white',
  round:
    'rounded-full bg-blue-dark text-yellow hover:bg-brown-light hover:text-white',
  curve: 'rounded-lg bg-brown-light text-white hover:bg-brown-dark',
  none: '',
};

const sizes = {
  base: 'text-base',
  xs: 'text-xs',
  sm: 'text-sm',
};

const spaces = {
  none: '',
  base: 'space-x-1',
  xs: 'space-x-2',
  sm: 'space-x-3',
};

const paddings = {
  base: 'p-2',
  xs: 'p-1',
  sm: 'p-1',
};

const aligns = {
  center: 'justify-center',
  between: 'justify-between',
  start: 'justify-start',
  end: 'justify-end',
};

export default {
  inheritAttrs: false,
  props: {
    href: {
      type: String,
      default: undefined,
    },
    to: {
      type: String,
      default: undefined,
    },
    append: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: String,
      default: undefined,
    },
    reverse: {
      type: Boolean,
      default: undefined,
    },
    variant: {
      type: String,
      default: 'base',
    },
    size: {
      type: String,
      default: 'base',
    },
    justify: {
      type: String,
      default: 'center',
    },
    space: {
      type: String,
      default: 'base',
    },
    srOnly: Boolean,
    disabled: Boolean,
  },
  computed: {
    // assign computed classes
    classes() {
      return [
        variants[this.variant],
        aligns[this.justify],
        spaces[this.space],
        sizes[this.size] || sizes.base,
        this.variant !== 'base' ? paddings[this.size] || paddings.base : '',
      ].filter((cls) => !!cls);
    },

    // check type to determinate which component to use
    type() {
      if (this.href) return 'a';
      if (this.to) return 'nuxt-link';
      return 'button';
    },

    // Load base icon component
    baseIcon() {
      return () => import(`@/components/ui/base/UiIcon.vue`);
    },

    // convert icon string to array using ',' sperator
    extractedIcons() {
      return this.icons ? this.icons.split(',').map((item) => item.trim()) : [];
    },

    iconSize() {
      if (this.size === 'base' || this.size === 'xs') return 'sm';
      return this.size;
    },
  },
};
</script>
