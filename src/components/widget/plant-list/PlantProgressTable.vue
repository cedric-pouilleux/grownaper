<template>
  <el-progress
    :text-inside="true"
    :stroke-width="16"
    :status="status"
    :percentage="percent">
    {{getProgressText}}
  </el-progress>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import PlantResource from '@/resources/PlantResource';
import { useI18n } from 'vue-i18n';

export default defineComponent({

  name: 'PlantProgressTable',

  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
  },

  setup(props) {
    const getProgressText: ComputedRef<string> = computed((): string => {
      const { t } = useI18n({ inheritLocale: true });

      if (!props.plant) {
        return '';
      }
      if (props.plant.isGrowing()) {
        return t('growing');
      }
      if (props.plant.isFlowering()) {
        return t('flowering');
      }
      if (props.plant.isDrying()) {
        return t('drying');
      }
      if (props.plant.isCurring()) {
        return t('curring');
      }
      return t('not.started');
    });

    const percent: ComputedRef<number> = computed((): number => {
      if (!props.plant) {
        return 0;
      }
      if (props.plant.isFlowering()) {
        return props.plant.floweringPercent();
      }
      if (props.plant.isCurring()) {
        return props.plant.curringPercent();
      }
      if (props.plant.isDrying() || props.plant.isGrowing()) {
        return 100;
      }
      return 0;
    });

    const status: ComputedRef<string> = computed((): string => {
      if (!props.plant) {
        return '';
      }
      if (props.plant.isGrowing()) {
        return 'success';
      }
      if (props.plant.isDrying()) {
        return 'success';
      }
      if (props.plant.isFlowering()) {
        return props.plant.floweringPercent() === 100 ? 'success' : '';
      }
      if (props.plant.isCurring()) {
        return props.plant.curringPercent() === 100 ? 'success' : '';
      }
      return '';
    });

    return {
      getProgressText,
      percent,
      status,
    };
  },
});
</script>
