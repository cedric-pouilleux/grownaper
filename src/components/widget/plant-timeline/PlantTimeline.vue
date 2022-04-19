<template>
  <div class="plant-timeline">
    <header class="plant-timeline__header weeks">
      <div class="days">L</div>
      <div class="days">M</div>
      <div class="days">M</div>
      <div class="days">J</div>
      <div class="days">V</div>
      <div class="days">S</div>
      <div class="days">D</div>
    </header>
    <div class="weeks" v-for="(week, index) in getDays" :key="index">
      <div class="days"
           v-for="(day, i) in week"
           :key="i"
           :class="{
             current : isCurrent(day),
             flowering: isFlowering(day),
             growing: isGrowingDay(day),
           }">
        <button @click="openDetails(day)">{{ getTileText(day) }}</button>
        <!--VDropdown v-if="day" placements="top">
          <template #popper>
            <div class="day-selection">
              {{ getReadableDay(day) }}
            </div>
          </template>
        </VDropdown-->
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent,
} from 'vue';
import PlantResource from '@/resources/PlantResource';
import Moment from 'moment';

export default defineComponent({
  name: 'PlantTimeline',

  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
  },

  setup(props) {
    const getDays = computed(() => {
      const endDay = props.plant.getEndDay();
      const startGrowingDay = props.plant.startGrowingDate;
      if (!endDay || !startGrowingDay) {
        return null;
      }
      const endDate = new Date(endDay);
      const startDate = new Date(startGrowingDay);
      const days: Array<Array<Date|null>> = [];
      let arr: Array<Date|null> = [];

      const day: number = startDate.getDay();
      const startDay = day < 1 ? 6 : day - 1;

      for (let i = 0; i < startDay; i += 1) {
        arr.push(null);
      }

      for (startDate; startDate <= endDate; startDate.setDate(startDate.getDate() + 1)) {
        const currentDate = new Date(startDate);
        if (arr.length === 7 || currentDate.toDateString() === endDate.toDateString()) {
          days.push(arr);
          arr = [];
        }
        arr.push(currentDate);
      }
      return days;
    });

    function isCurrent(day): boolean {
      if (day) {
        return new Date().toDateString() === day.toDateString();
      }
      return false;
    }

    function isFlowering(day): boolean {
      if (day) {
        return props.plant.isFloweringDay(day);
      }
      return false;
    }

    function isGrowingDay(day): boolean {
      if (day) {
        return props.plant.isGrowingDay(day);
      }
      return false;
    }

    function getTileText(day): string {
      if (!day) {
        return '';
      }
      if (day.getDate() === 1) {
        return Moment(day).format('MMM');
      }
      return day.getDate();
    }

    function openDetails(day) {
      if (isFlowering(day)) {
        const p = props.plant.getFloweringProductsDoses(day);
        console.log('end', p);
      }
    }

    return {
      getDays,
      isCurrent,
      isFlowering,
      isGrowingDay,
      getTileText,
      openDetails,
    };
  },
});
</script>

<style lang="scss" scoped>

.day-selection {
  width: 100px;
  padding: 12px;
}

.v-popper--theme-tooltip {
  height: 100%;
  width: 100%;
}

.plant-timeline {

    &__header {
      .days {
        text-align: center;
        height: 20px;
        font-size: 10px;
        width: 30px;
      }
    }

    .weeks {
      display: flex;
    }

    .days {
      height: 100%;
      width: 30px;
      max-width: 30px;
      display: flex;
      flex: 1 1 0;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
      margin: 1px 1px 0 0;
      border-radius: 4px;
      cursor: pointer;

      button {
        height: 25px;
        font-size: 10px;
        width: 30px;
      }

      &.flowering {
        border: 1px solid #ccc;
        color: green;
      }

      &.growing {
        border: 1px solid #ebebeb;
        color: #333;
      }

      &.current {
        background-color: #ccc;
        color: #fff;
      }

      button[data-popper-shown] {
        background-color: #333;
        color: #fff;
      }

      &:hover {
        button {
          background-color: #333;
          color: #fff;
        }
        border: 1px solid #333;
      }

    }
}
</style>
