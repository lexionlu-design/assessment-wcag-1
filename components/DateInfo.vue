<template>
  <div class="flex w-full h-full bg-yellow-lighter text-xs sm:text-sm">
    <div
      v-for="(count, index) in 7"
      :key="count"
      class="relative flex flex-col items-center lg:justify-center w-full p-2"
      :class="{
        'bg-yellow-lightest text-brown-darker': count === 4,
        'bg-yellow-light': timetable && makeDate(index) < minDate,
      }"
    >
      <div
        v-if="count === 4"
        class="block lg:sr-only bg-brown-darker py-px absolute inset-x-0 top-0"
      ></div>
      <div
        :class="{ 'block lg:sr-only': timetable }"
        class="flex flex-col items-center justify-center"
      >
        <div
          class="flex flex-col items-center justify-center lg:flex-row lg:space-x-1"
        >
          <span>{{ month(index) }}</span>
          <span>{{ day(index) }}</span>
        </div>
        <span>{{ dayName(index) }}</span>
      </div>
      <div v-if="timetable" class="mt-2 h-8">
        <div
          v-if="flight(index)"
          class="flex flex-col items-center justify-start space-y-1"
        >
          <span
            ><ui-icon
              class="lg:hidden text-brown-lighter"
              :name="flight(index).cargo ? 'cargo' : 'airplane'"
              size="sm"
            />
            <ui-icon
              :name="flight(index).cargo ? 'cargo' : 'airplane'"
              size="md"
              class="hidden lg:block text-brown-lighter"
            />
            <span class="sr-only">{{
              flight(index).cargo
                ? 'Cargo Only Flight'
                : 'Passenger Only Flight'
            }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export default {
  props: {
    currentDate: {
      type: Date,
      default: () => new Date(),
    },
    minDate: {
      type: Date,
      default: () => new Date(),
    },
    timetable: {
      type: Array,
      default: () => undefined,
    },
  },
  computed: {
    month() {
      return (days) => monthNames[this.makeDate(days - 3).getMonth()];
    },
    day() {
      return (days) => this.makeDate(days - 3).getDate();
    },
    dayName() {
      return (days) => dayNames[this.makeDate(days - 3).getDay()];
    },
    // current flight timetable
    flight() {
      return (days) =>
        this.timetable.find((flight) => {
          return (
            new Date(flight.date).getTime() === this.makeDate(days).getTime()
          );
        });
    },
  },
  methods: {
    // make a date with given +- days
    makeDate(days) {
      const date = new Date(this.currentDate);
      return new Date(date.setDate(date.getDate() + days));
    },
  },
};
</script>
