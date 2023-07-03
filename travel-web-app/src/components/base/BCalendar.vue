<template>
  <Qalendar :selected-date="new Date(selectedDate)" :events="events" :config="config" @updated-period="updatePeriod" @day-was-clicked="clickDay" />
</template>

<script>

import { Qalendar } from "qalendar";

import "qalendar/dist/style.css";
import { computed, getCurrentInstance } from 'vue';
import { formatDate } from '@/js/common/format';
export default {
  name: "BCalendar",
  props: {
    data: {
      default: () => []
    },
    selectedDate: {
      default: new Date()
    }
  },
  components: {
    Qalendar
  },
  data() {
    return {
      // events: [
      //   // ...
      //   {
      //     title: "Advanced algebra",
      //     with: "Chandler Bing",
      //     time: { start: "2023-06-29 12:05", end: "2023-06-30 13:35" },
      //     color: "yellow",
      //     isEditable: true,
      //     id: "753944708f0f",
      //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
      //   },
      //   {
      //     title: "Ralph on holiday",
      //     with: "Rachel Greene",
      //     time: { start: "2023-06-30 12:05", end: "2023-07-01 13:35" },
      //     color: "green",
      //     isEditable: false,
      //     id: "5602b6f5s89fc"
      //   },
      //   {
      //     title: "Ralph on holiday",
      //     with: "Rachel Greene",
      //     time: { start: "2023-06-30 12:05", end: "2023-07-01 13:35" },
      //     color: "green",
      //     isEditable: false,
      //     id: "5602b6sdf589fc"
      //   },
      //   {
      //     title: "Ralph on holiday",
      //     with: "Rachel Greene",
      //     time: { start: "2023-06-30", end: "2023-07-01" },
      //     color: "green",
      //     isEditable: false,
      //     id: "560asd2b6f589fc"
      //   }
      // ],
      config: {
        showCurrentTime: false,
        defaultMode: 'month',
        locale: 'vi-VI',
        disableModes: ['day'],
        dayBoundaries: {
          start: 0,
          end: 1
        },
        isSilent: true,
        month: {
          // Hide leading and trailing dates in the month view (defaults to true when not set)
          showTrailingAndLeadingDates: false,
        },
        style: {
          colorSchemes: {
            passed: {
              color: '#353535',
              backgroundColor: '#131313',
            },
            now: {
              color: 'yellow',
            },
            future: {
              color: 'green',
            }
          }
        },
      }
    }
  },
  setup() {

    const { proxy } = getCurrentInstance();

    const events = computed(() => {
      return proxy.data.map(item => {
        let now = new Date();
        let color = 'green';
        if (new Date(item.to_date) < now) {
          color = 'red'
        } else if (new Date(item.from_date) < now) {
          color = 'yellow'
        }
        return {
          title: `${item.parent_name ? item.parent_name + ' - ' : ''} ${item.title}`,
          with: item.name,
          time: { start: formatDate(item.from_date, 'yyyy-MM-DD'), end: formatDate(item.to_date, 'yyyy-MM-DD') },
          color: color,
          isEditable: false,
          id: item.order_id,
          description: item.description
        }
      });
    });

    const updatePeriod = (time) => {
      console.log(time);
      proxy.$emit('updatePeriod', time)
    }

    const clickDay = (date) => {
      console.log(date);
      proxy.$emit('clickDay', date)
    }

    return {
      updatePeriod,
      clickDay,
      events
    }
  }
}
</script>

<style lang="scss">
.calendar-root-wrapper {
  height: unset !important;
}

.calendar-month__weekday {
  min-height: 60px !important;
  cursor: pointer !important;
}

.calendar-week__wrapper {
  display: none;
}

.week-timeline__events {
  min-height: 70px;
  cursor: pointer !important;

  .week-timeline__event {
    min-height: 1.2rem;
    flex-wrap: wrap;
    height: unset;
  }
}
</style>