<template>
  <el-progress :text-inside="true"
               :percentage="percent"
               :stroke-width="16"
               :status="status">
    {{text}}
  </el-progress>
</template>

<script lang="ts">
import {
  computed, ComputedRef, defineComponent, ref,
} from 'vue';
import Moment from 'moment';
import PlantResource from '@/resources/PlantResource';

export default defineComponent({
  name: 'GrowingProgress',

  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
  },

  setup(props) {
    const currentDate = ref(Moment());

    const expiredDays: ComputedRef<number> = computed(
      () => currentDate.value.diff(props.plant?.startGrowingDate, 'days'),
    );

    const text: ComputedRef<string> = computed((): string => {
      if (!props.plant?.startGrowingDate) {
        return 'Growing date not selected';
      }
      if (props.plant.isGrowing()) {
        if (expiredDays.value === 0) {
          return 'Growing start today';
        }
        if (expiredDays.value > 0) {
          return `Growing start since ${expiredDays.value} days`;
        }
      }
      if (expiredDays.value > 0) {
        return `Growing complete on ${expiredDays.value} days`;
      }
      return `Growing start in ${-expiredDays.value} days`;
    });

    const percent: ComputedRef<number> = computed((): number => {
      if (!props.plant?.startGrowingDate) {
        return 0;
      }
      if (expiredDays.value < 0) {
        return 0;
      }
      return 100;
    });

    const status: ComputedRef<string> = computed((): string => {
      if (!props.plant.startGrowingDate || props.plant.isGrowing()) {
        return '';
      }
      return 'success';
    });

    return {
      text,
      percent,
      status,
      currentDate, // use for unit testing
    };
  },
});
</script>
