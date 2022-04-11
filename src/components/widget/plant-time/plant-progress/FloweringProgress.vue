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
import { object } from 'vue-types';
import { Percent } from '@/common/utils';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'FloweringProgress',

  props: {
    plant: object<PlantResource>().isRequired,
  },

  setup(props) {
    const currentDate = ref(Moment());
    const { t } = useI18n();

    /**
     * Text render
     * TODO => Refacto
     */
    const text: ComputedRef<string> = computed((): string => {
      const { variety, startFloweringDate, collectedDate } = props.plant;
      if (!variety) {
        return t('plant.time.no.variety.date');
      }
      if (!startFloweringDate) {
        return t('plant.time.no.flowering.date');
      }
      const days = Moment(startFloweringDate).add(variety.floTime, 'd').diff(currentDate.value, 'days');
      const daysWork = variety.floTime - days;
      if (props.plant.isFlowering() && daysWork > 0) {
        return t('plant.time.current.flowering', { daysWork, floTime: variety.floTime });
      }
      if (props.plant.isDrying() || props.plant.isCurring()) {
        const totalDays = Moment(collectedDate).diff(startFloweringDate, 'days');
        return t('plant.time.flowering.complete', { totalDays, floTime: variety.floTime });
      }
      if (daysWork === 0) {
        return t('plant.time.flowering.start.today');
      }
      return t('plant.time.flowering.start.in', { days: -daysWork });
    });

    /**
     * Percent render
     */
    const percent: ComputedRef<number> = computed((): number => {
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

    /**
     * Status render
     */
    const status: ComputedRef<string> = computed((): string => {
      if (props.plant.collectedDate) {
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
