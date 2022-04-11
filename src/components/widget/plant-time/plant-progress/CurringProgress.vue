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
  computed,
  ComputedRef, defineComponent, ref,
} from 'vue';
import Moment from 'moment';
import PlantResource from '@/resources/PlantResource';
import { Percent } from '@/common/utils';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'CurringProgress',

  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
  },

  setup(props) {
    const currentDate = ref(Moment());
    const isVisible: ComputedRef<boolean> = computed((): boolean => !!props.plant.startCurringDate);
    const recommendationDays = ref<number>(60);
    const { t } = useI18n({ inheritLocale: true });

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
        return t('plant.time.curring.complete', recommendationDays.value);
      }
      if (props.plant.startCurringDate) {
        return t('plant.time.current.curring', {
          currentDays: getDryingFromNow.value,
          totalDays: recommendationDays.value,
        });
      }
      return t('plant.time.curring.not.started');
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
      isVisible,
      text,
      percent,
      status,
      currentDate, // use for unit testing
    };
  },
});
</script>
