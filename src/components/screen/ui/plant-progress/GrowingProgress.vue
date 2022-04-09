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
import { object } from 'vue-types';

export default defineComponent({
  name: 'GrowingProgress',

  props: {
    plant: object<PlantResource>().isRequired,
  },

  setup(props) {
    const currentDate = ref(Moment());

    const text: ComputedRef<string> = computed((): string => {
      if (!props.plant?.startGrowingDate) {
        return 'Growing date not selected';
      }
      const days = currentDate.value.diff(props.plant?.startGrowingDate, 'days');
      if (props.plant.isGrowing()) {
        if (days === 0) {
          return 'Start today';
        }
        return `Growing start since ${days} days`;
      }
      if (props.plant.isFlowering() || props.plant.isCurring() || props.plant.isDrying()) {
        if (days > 0) {
          return `Growing complete, total ${days} days`;
        }
        return `Growing start in ${-days} days`;
      }
      return '';
    });

    const percent: ComputedRef<number> = computed((): number => {
      if (!props.plant?.startGrowingDate) {
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
      currentDate,
    };
  },
});
</script>
