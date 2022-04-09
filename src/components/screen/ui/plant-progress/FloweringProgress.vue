<template>
  <el-progress :text-inside="true"
               :percentage="percent"
               :stroke-width="16"
               :status="status">
    {{text}}
  </el-progress>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Moment from 'moment';
import PlantResource from '@/resources/PlantResource';
import { object } from 'vue-types';
import { Percent } from '@/common/utils';

export default defineComponent({
  name: 'floweringProgress',

  props: {
    plant: object<PlantResource>().isRequired,
  },

  setup(props) {
    const currentDate = ref(Moment());

    const text = computed(() => {
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
      return `Flowering start in ${-daysWork} days`;
    });

    const percent = computed(() => {
      const { startFloweringDate, variety, collectedDate } = props.plant;
      if (!startFloweringDate || !variety) {
        return 0;
      }
      if (collectedDate) {
        return 100;
      }
      const days = currentDate.value.diff(startFloweringDate, 'days');
      if (days > 0) {
        const val = Percent(days, variety.floTime);
        if (val > 100) {
          return 100;
        }
        return Percent(days, variety.floTime);
      }
      return 0;
    });

    const status = computed(() => {
      const { startFloweringDate, variety, collectedDate } = props.plant;
      if (collectedDate) {
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
