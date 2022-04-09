<template>
  <el-progress :text-inside="true"
               :percentage="percent"
               :stroke-width="16"
               :status="status">
    {{text}}
  </el-progress>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
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
    const text = computed(() => {
      if (!props.plant) {
        return null;
      }
      const { variety, startFloweringDate, collectedDate } = props.plant;
      if (!variety || !startFloweringDate) {
        return 'flowering not started';
      }
      if (props.plant.isDrying() || props.plant.isCurring()) {
        const date = Moment(collectedDate).diff(startFloweringDate, 'days');
        return `Flowering complete ${date} / ${variety.floTime}`;
      }
      const days = Moment(startFloweringDate).add(variety.floTime, 'd').diff(Moment(), 'days');
      if (variety.floTime - days > 0) {
        return `${variety.floTime - days} / ${variety.floTime} flowering`;
      }
      return `Flowering start in ${-(variety.floTime - days)} days`;
    });

    const percent = computed(() => {
      const { startFloweringDate, variety, collectedDate } = props.plant;
      if (!startFloweringDate || !variety) {
        return 0;
      }
      if (collectedDate) {
        return 100;
      }
      const days = Moment().diff(startFloweringDate, 'days');
      return Percent(days, variety.floTime);
    });

    const status = computed(() => {
      const { startFloweringDate, variety, collectedDate } = props.plant;
      if (collectedDate) {
        return 'success';
      }
      if (!startFloweringDate || !variety) {
        return 'danger';
      }
      return 'primary';
    });

    return {
      text,
      percent,
      status,
    };
  },
});
</script>
