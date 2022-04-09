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

export default defineComponent({
  name: 'dryingProgress',

  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
  },

  setup(props) {
    const currentDate = ref(Moment());

    const getDryingDuration: ComputedRef<number> = computed((): number => {
      if (props.plant.collectedDate || props.plant.startCurringDate) {
        return Moment(props.plant.startCurringDate).diff(props.plant.collectedDate, 'days');
      }
      return 0;
    });

    /**
     * Text render
     */
    const text: ComputedRef<string> = computed((): string => {
      if (props.plant.isCurring()) {
        const finishedDay = currentDate.value.diff(getDryingDuration.value, 'days');
        return `Drying complete on ${getDryingDuration.value} days`;
      }
      if (props.plant.isDrying()) {
        const days = currentDate.value.diff(props.plant.collectedDate, 'days');
        return `Drying ${days} days`;
      }
      return 'Drying not started';
      /*
      const { variety, startFloweringDate, collectedDate } = props.plant;
      if (!variety) {
        return 'Variety not selected';
      }
      if (!startFloweringDate) {
        return 'Flowering date not selected';
      }

      const days = Moment(startFloweringDate).add(variety.floTime, 'd').diff(currentDate.value, 'days');
      const daysWork = variety.floTime - days;
      if (props.plant.isFlowering() && daysWork > 0) {
        return `Flowering ${daysWork} / ${variety.floTime} days`;
      }
      if (props.plant.isDrying() || props.plant.isCurring()) {
        const date = Moment(collectedDate).diff(startFloweringDate, 'days');
        return `Flowering complete ${date} / ${variety.floTime}`;
      }
      if (daysWork === 0) {
        return 'Flowering start tomorrow';
      }
      return `Flowering start in ${-daysWork} days`; */
    });

    /**
     * Percent render
     */
    const percent: ComputedRef<number> = computed((): number => {
      if (props.plant.isDrying() || props.plant.isCurring()) {
        return 100;
      }
      return 0;
    });

    /**
     * Status render
     */
    const status: ComputedRef<string> = computed((): string => {
      if (props.plant) {
        return 'success';
      }
      return '';
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
