<template>
  <el-progress v-if="isVisible"
               :text-inside="true"
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
import { useI18n } from 'vue-i18n';

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
    const { t } = useI18n({ inheritLocale: true });

    const expiredDays: ComputedRef<number> = computed(
      (): number => currentDate.value.diff(props.plant?.startGrowingDate, 'days'),
    );

    const isVisible: ComputedRef<boolean> = computed((): boolean => {
      const { startGrowingDate, startFloweringDate } = props.plant;
      if (!startGrowingDate || !startFloweringDate) {
        return true;
      }
      if (Moment(startGrowingDate).isSame(startFloweringDate, 'day')) {
        return false;
      }
      return true;
    });

    const text: ComputedRef<string> = computed((): string => {
      if (!props.plant?.startGrowingDate) {
        return t('plant.time.no.growing.date');
      }
      if (props.plant.isGrowing()) {
        return t('plant.time.growing.start.since', expiredDays.value);
      }
      if (expiredDays.value > 0) {
        return t('plant.time.growing.complete', expiredDays.value);
      }
      return t('plant.time.start.in', { days: -expiredDays.value });
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
      isVisible,
      expiredDays, // use for unit testing
      text,
      percent,
      status,
      currentDate, // use for unit testing
    };
  },
});
</script>
