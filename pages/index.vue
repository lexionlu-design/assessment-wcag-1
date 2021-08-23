<template>
  <div class="bg-blue-dark">
    <div class="container py-6 space-y-5">
      <div
        class="flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0"
      >
        <h2 class="text-xl text-white">Bangkok to Los Angeles</h2>
        <div class="flex self-end space-x-3 text-white text-xs">
          <p class="flex space-x-1 justify-end items-center">
            <ui-icon class="text-brown-lighter" name="cargo" size="sm" />
            <span>Cargo only</span>
          </p>
        </div>
      </div>
      <div class="flex justify-end text-yellow relative">
        <div class="w-full lg:w-3/5 relative z-20">
          <div class="flex justify-between w-full">
            <div>
              <ui-button
                v-if="currentDate > new Date()"
                icons="arrow-left"
                size="xs"
                @click="changeWeek(-7)"
                >Previous week</ui-button
              >
            </div>
            <div>
              <ui-button
                icons="arrow-right"
                size="xs"
                reverse
                @click="changeWeek(7)"
                >Next week</ui-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-4 lg:space-y-0 lg:divide-y divide-gray">
        <div class="hidden lg:flex bg-yellow-lightest">
          <div class="flex w-2/5 divide-x-2 divide-yellow-lighter">
            <div class="w-1/3"></div>
            <div class="w-2/3 flex justify-between relative px-4 py-2">
              <div
                class="absolute inset-x-0 mx-24 mt-4 h-px bg-gray-light"
              ></div>
              <div class="flex flex-col w-32">
                <span class="text-xl">{{ search.origin.code }}</span>
                <span class="text-xs">{{ search.origin.airport }}</span>
                <span class="text-xs">{{ search.origin.terminal }}</span>
              </div>
              <div class="flex flex-col items-end w-32 text-right">
                <span class="text-xl">{{ search.destination.code }}</span>
                <span class="text-xs">{{ search.destination.airport }}</span>
                <span class="text-xs">{{ search.destination.terminal }}</span>
              </div>
            </div>
          </div>
          <div class="w-3/5 flex bg-yellow-lighter">
            <date-info :current-date="currentDate" />
          </div>
        </div>
        <div
          v-for="result in results"
          :key="result.id"
          class="lg:flex bg-yellow-lightest"
        >
          <div
            class="lg:flex w-full lg:w-2/5 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-yellow-lighter"
          >
            <div class="w-full lg:w-1/3 py-4 px-5">
              <span class="block text-brown-darker text-2xl">{{
                result.flightNo
              }}</span>
              <div class="text-xs">
                <p>Operated by {{ result.operatedBy }}</p>
                <div class="flex space-x-1 items-center">
                  <ui-icon
                    class="text-gray-light"
                    name="airplane"
                    size="sm"
                  />
                  <span>{{ result.airplane }}</span>
                </div>
              </div>
            </div>
            <div
              class="w-full lg:w-2/3 flex items-start lg:items-center justify-between relative py-2 px-4"
            >
              <div
                class="flex flex-col items-start relative mt-5 lg:mt-0 w-32"
              >
                <span class="text-2xl text-brown-darker">{{
                  from(result.flights).departure.time
                }}</span>
                <div class="flex lg:hidden flex-col">
                  <span class="text-xl">{{
                    from(result.flights).origin.code
                  }}</span>
                  <span class="text-xs">{{
                    from(result.flights).origin.airport
                  }}</span>
                  <span class="text-xs">{{
                    from(result.flights).origin.terminal
                  }}</span>
                </div>
              </div>
              <div
                class="absolute mx-24 inset-x-0 lg:inset-y-auto top-0 grid grid-rows-2"
              >
                <div v-if="stop(result.flights)" class="flex justify-center">
                  <ui-button
                    size="xs"
                    icons="info"
                    reverse
                    @click="showId = result.id"
                    >1 stop at
                    {{ stop(result.flights).origin.code }}</ui-button
                  >
                  <ui-modal
                    v-if="flightDetail"
                    :show="showId === flightDetail.id"
                    max-width="sm"
                    title="Flight Details"
                    @close="showId = undefined"
                  >
                    <div class="-mx-4 lg:-mx-8">
                      <div
                        class="py-4 border-t-8 border-yellow-lighter px-4 lg:px-8 space-y-2"
                      >
                        <h2 class="text-xl">
                          {{ from(flightDetail.flights).origin.city }} to
                          {{ to(flightDetail.flights).destination.city }}
                        </h2>
                        <p class="text-brown-darker text-2xl">
                          {{ flightDetail.flightNo }}
                        </p>
                        <div class="text-xs">
                          <p>Operated by {{ flightDetail.operatedBy }}</p>
                          <div class="flex space-x-1 items-center">
                            <ui-icon
                              class="text-gray-light"
                              name="airplane"
                              size="sm"
                            />
                            <span>{{ flightDetail.airplane }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="bg-yellow-light p-4 -mb-6">
                        <div
                          class="bg-yellow-lightest pt-8 py-4 px-4 space-y-8"
                        >
                          <div
                            v-for="(flight, index) in flightDetail.flights"
                            :key="index"
                          >
                            <div
                              class="w-full flex items-start lg:items-center justify-between relative"
                            >
                              <div
                                class="flex flex-col items-start relative mt-5 lg:mt-0 w-32"
                              >
                                <span class="text-2xl text-brown-darker">{{
                                  flight.departure.time
                                }}</span>
                                <div class="flex flex-col">
                                  <span class="text-xl">{{
                                    flight.origin.code
                                  }}</span>
                                  <span class="text-xs">{{
                                    flight.origin.airport
                                  }}</span>
                                  <span class="text-xs">{{
                                    flight.origin.terminal
                                  }}</span>
                                </div>
                              </div>
                              <div
                                class="absolute mx-24 inset-x-0 lg:inset-y-auto top-0 grid grid-rows-2"
                              >
                                <duration
                                  :time="flight.duration"
                                  class="
                                    text-brown-darker
                                    border-t border-gray-light
                                    row-start-2
                                    text-center
                                    py-2
                                    w-full
                                  "
                                />
                              </div>
                              <div
                                class="flex flex-col items-end relative mt-5 lg:mt-0 w-21"
                              >
                                <span
                                  v-if="flight.arrival.days"
                                  class="
                                    text-red-dark text-xs
                                    absolute
                                    text-right
                                    right-0
                                    top-0
                                    -mt-5
                                    whitespace-no-wrap
                                  "
                                  >Next {{ flight.arrival.days }} day(s)</span
                                >
                                <span class="text-2xl text-brown-darker">{{
                                  flight.arrival.time
                                }}</span>
                                <div class="flex flex-col items-end">
                                  <span class="text-xl">{{
                                    flight.destination.code
                                  }}</span>
                                  <span class="text-xs">{{
                                    flight.destination.airport
                                  }}</span>
                                  <span class="text-xs">{{
                                    flight.destination.terminal
                                  }}</span>
                                </div>
                              </div>
                            </div>
                            <div
                              v-if="flightDetail.flights[index + 1]"
                              class="text-center relative divide-y divide-dashed divide-gray-light py-2"
                            >
                              <span
                                class="inline-block bg-yellow-lightest relative z-10 px-2"
                              >
                                On ground
                                <duration
                                  :time="flight.layover"
                                  class="text-brown-darker"
                                />
                              </span>
                              <div class="-mt-3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ui-modal>
                </div>
                <duration
                  :time="totalDuration(result.flights)"
                  class="text-brown-darker border-t border-gray-light row-start-2 text-center py-2 w-full"
                />
              </div>
              <div class="flex flex-col items-end relative mt-5 lg:mt-0 w-32">
                <span
                  v-if="to(result.flights).arrival.days"
                  class="text-red-dark text-xs absolute text-right right-0 top-0 -mt-5 whitespace-no-wrap"
                  >Next {{ to(result.flights).arrival.days }} day(s)</span
                >
                <span class="text-2xl text-brown-darker">{{
                  to(result.flights).arrival.time
                }}</span>
                <div class="flex lg:hidden flex-col items-end">
                  <span class="text-xl">{{
                    to(result.flights).destination.code
                  }}</span>
                  <span class="text-xs">{{
                    to(result.flights).destination.airport
                  }}</span>
                  <span class="text-xs">{{
                    to(result.flights).destination.terminal
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-3/5">
            <date-info
              :current-date="currentDate"
              :min-date="minDate"
              :timetable="result.timetable"
            />
          </div>
        </div>
      </div>
      <div class="w-full flex lg:justify-end py-4">
        <ui-button to="/booking" variant="curve" class="w-full lg:w-1/5">
          Book Now
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimetableSearchResult',
  data() {
    return {
      showId: undefined,
      currentDate: this.dummyDate(),
      minDate: this.dummyDate(3),
      search: {
        flightNo: 'JX0721',
        operatedBy: 'STARLUX AIRLINES',
        airplane: 'Airbus A330-300',
        origin: {
          code: 'TPE',
          airport: 'Taipei Intl Airport',
          terminal: 'Terminal 1',
        },
        destination: {
          code: 'LAX',
          airport: 'Los Angeles Intl Airport',
          terminal: 'Terminal 1',
        },
      },
      results: [
        {
          id: 1,
          timetable: [
            {
              date: this.dummyDate(3),
              cargo: true,
            },
            {
              date: this.dummyDate(5),
              cargo: false,
            },
            {
              date: this.dummyDate(8),
              cargo: false,
            },
          ],
          flightNo: 'JX0721',
          airplane: 'Airbus A330-300',
          operatedBy: 'STARLUX AIRLINES',
          flights: [
            {
              duration: 11111111,
              layover: 0,
              departure: {
                time: '12:45',
              },
              arrival: {
                time: '01:45',
              },
              origin: {
                city: 'Taipei',
                code: 'TPE',
                airport: 'XXXX Intl Airport',
                terminal: 'Terminal 1',
              },
              destination: {
                city: 'Los Angeles',
                code: 'LAX',
                airport: 'XXXX Intl Airport',
                terminal: 'Terminal 1',
              },
            },
          ],
        },
        {
          id: 2,
          timetable: [
            {
              date: this.dummyDate(3),
              cargo: true,
            },
            {
              date: this.dummyDate(10),
              cargo: true,
            },
            {
              date: this.dummyDate(16),
              cargo: false,
            },
          ],
          flightNo: 'JX0722',
          airplane: 'Airbus A330-300',
          operatedBy: 'STARLUX AIRLINES',
          flights: [
            {
              duration: 11111111,
              layover: 11111111,
              departure: {
                time: '01:00',
              },
              arrival: {
                time: '12:00',
                days: 1,
              },
              origin: {
                city: 'Taipei',
                code: 'TPE',
                airport: 'XXXX Intl Airport',
                terminal: 'Terminal 1',
              },
              destination: {
                city: 'Istanbul',
                code: 'IST',
                airport: 'XXXX Intl Airport',
                terminal: 'Terminal 1',
              },
            },
            {
              duration: 11111111,
              layover: 0,
              departure: {
                time: '13:00',
              },
              arrival: {
                time: '14:00',
                days: 1,
              },
              origin: {
                city: 'Istanbul',
                code: 'IST',
                airport: 'XXXX Intl Airport',
                terminal: 'Terminal 1',
              },
              destination: {
                city: 'Los Angeles',
                code: 'LAX',
                airport: 'XXXX Intl Airport',
                terminal: 'Terminal 1',
              },
            },
          ],
        },
      ],
    };
  },
  computed: {
    totalDuration() {
      return (flights) =>
        flights.reduce(
          (current, next) => current + next.duration + next.layover,
          0,
        );
    },
    stop() {
      return (flights) => (flights.length > 1 ? flights[1] : false);
    },
    from() {
      return (flights) => flights[0];
    },
    to() {
      return (flights) => flights[flights.length - 1];
    },
    flightDetail() {
      return this.results.find((flight) => flight.id === this.showId);
    },
  },
  methods: {
    // change week
    changeWeek(days = 7) {
      this.currentDate = new Date(
        this.currentDate.setDate(this.currentDate.getDate() + days),
      );
    },
    // dummy date maker for demostration, !! ST DO NOT USE IN PRODUCTION !!
    dummyDate(days = 0) {
      const dummyDate = new Date();
      return new Date(dummyDate.setDate(dummyDate.getDate() + days));
    },
  },
  head: {
    title: 'Timetable Search Result',
  },
};
</script>
