<template>
  <span>
    <span v-if="durationConverter(time).days"
      >{{ durationConverter(time).days }}d</span
    >
    <span v-if="durationConverter(time).hours"
      >{{ durationConverter(time).hours }}h</span
    >
    <span v-if="durationConverter(time).minutes"
      >{{ durationConverter(time).minutes }}m</span
    >
  </span>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    // Converts miliseconds to duration
    durationConverter(mss) {
      const days = Math.floor(mss / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
      return { days, hours, minutes };
    },
  },
};
</script>
