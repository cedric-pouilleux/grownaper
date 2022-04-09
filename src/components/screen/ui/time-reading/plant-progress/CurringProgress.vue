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
  computed,
  ComputedRef, defineComponent, ref,
} from 'vue';
import Moment from 'moment';
import PlantResource from '@/resources/PlantResource';
import { Percent } from '@/common/utils';

export default defineComponent({
  name: 'curringProgress',

  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
  },

  setup(props) {
    const currentDate = ref(Moment());
    const recommendationDays = ref<number>(60);

    const getDryingFromNow: ComputedRef<number> = computed((): number => {
      if (props.plant.startCurringDate) {
        return currentDate.value.diff(props.plant.startCurringDate, 'days');
      }
      return 0;
    });

    const isComplete: ComputedRef<boolean> = computed(
      (): boolean => getDryingFromNow.value > recommendationDays.value,
    );

    /**
     * Text render
     */
    const text: ComputedRef<string> = computed((): string => {
      if (isComplete.value) {
        return `Curring completed in ${recommendationDays.value} days`;
      }
      if (props.plant.startCurringDate) {
        return `Curring ${getDryingFromNow.value} / ${recommendationDays.value} days`;
      }
      return 'Curring not started';
    });

    /**
     * Percent render
     */
    const percent: ComputedRef<number> = computed((): number => {
      if (!props.plant.startCurringDate) {
        return 0;
      }
      const currentPercent = Percent(getDryingFromNow.value, recommendationDays.value);
      if (currentPercent > 100) {
        return 100;
      }
      return currentPercent;
    });

    /**
     * Status render
     */
    const status: ComputedRef<string> = computed((): string => {
      if (props.plant.startCurringDate) {
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
