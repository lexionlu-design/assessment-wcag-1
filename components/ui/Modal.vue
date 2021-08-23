<template>
  <portal v-if="show" to="modal">
    <focus-trap
      :escape-deactivates="false"
      :initial-focus="
        () => {
          return !dismiss
            ? $slots.footer[0].context.$refs.focusOnShow.$el
            : $refs.closeBtn.$el;
        }
      "
    >
      <ui-transition>
        <div
          aria-modal="true"
          role="dialog"
          :aria-labelledby="titleID"
          class="bg-blue-dark bg-opacity-90 flex justify-center lg:items-center inset-0 fixed z-40 lg:p-4"
          @keypress.esc.self="closeModal"
        >
          <div
            class="bg-yellow-lightest relative overflow-auto max-h-screen"
            :class="getMaxWidth"
            role="document"
          >
            <div class="flex justify-end px-4 lg:px-8 pt-6">
              <ui-button
                v-if="dismiss"
                ref="closeBtn"
                icons="close"
                class="p-2 -m-2"
                sr-only
                size="sm"
                @click="closeModal"
              >
                Close Modal
              </ui-button>
            </div>
            <div class="px-4 lg:px-8">
              <h2
                :id="titleID"
                class="text-2xl"
                aria-atomic="true"
                aria-live="assertive"
              >
                {{ title }}
              </h2>
              <div class="py-6">
                <slot />
                <div
                  v-if="$slots.footer"
                  class="mt-6 flex space-x-4 py-2 justify-center"
                >
                  <slot name="footer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ui-transition>
    </focus-trap>
  </portal>
</template>

<script>
import { FocusTrap } from 'focus-trap-vue';

const maxWidths = {
  auto: 'w-full md:w-auto',
  base: 'max-w-screen-2xl',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
};

export default {
  name: 'UiModal',
  components: {
    FocusTrap,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Modal',
    },
    dismiss: {
      type: Boolean,
      default: true,
    },
    maxWidth: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
      modalData: {},
    };
  },
  computed: {
    // Cheks if max-width defined
    getMaxWidth() {
      if (this.maxWidth === 'auto') return maxWidths.auto;

      return maxWidths[this.maxWidth] + ' w-full';
    },
    // For accesibility title id creation
    titleID() {
      return 'modalTitle-' + Math.floor(Math.random() * Date.now());
    },
  },
  mounted() {
    // Pressing ESC key to close modal
    const onEscape = (e) => {
      if (this.show && this.dismiss && e.keyCode === 27) {
        this.closeModal();
      }
    };
    document.addEventListener('keydown', onEscape);
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', onEscape);
    });
  },
  methods: {
    // Close modal
    closeModal() {
      this.$emit('close', this.modalData);
    },
  },
};
</script>
