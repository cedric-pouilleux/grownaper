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
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'DryingProgress',

  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
  },

  setup(props) {
    const currentDate = ref(Moment());
    const isVisible: ComputedRef<boolean> = computed((): boolean => !!props.plant.collectedDate);

    const { t } = useI18n({ inheritLocale: true });

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
        return t('plant.time.drying.complete', getDryingDuration.value);
      }
      if (props.plant.isDrying()) {
        const days = currentDate.value.diff(props.plant.collectedDate, 'days');
        if (days === 0) {
          return t('plant.time.drying.start.today');
        }
        return t('plant.time.current.drying', days);
      }
      return t('plant.time.drying.not.start');
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
      isVisible,
      text,
      percent,
      status,
      currentDate, // use for unit testing
    };
  },
});
</script>
