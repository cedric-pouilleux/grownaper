<template>
  <div class="plant-end-timing-resume">
    <el-row>
      <el-col :span="0">
        {{ leaveDay }}
      </el-col>
      <el-col :span="24" class="plant-end-timing-resume__progress">
        <growing-progress :plant="plant" />
        <flowering-progress :plant="plant"/>
        <el-progress :text-inside="true"
                     :stroke-width="16"
                     :percentage="Percent(getDryingDuration, 7)"
                     status="success">
          {{dryingProgressText}}
        </el-progress>
        <el-progress :text-inside="true"
                     :stroke-width="16"
                     color="#655551"
                     :percentage="Percent(getDryingFromNow, 60)"
                     status="success">
          Curring
          {{getDryingFromNow}} / 60
        </el-progress>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Moment from 'moment';
import { Percent } from '@/common/utils';
import PlantResource from '@/resources/PlantResource';
import GrowingProgress from '@/components/screen/ui/plant-progress/GrowingProgress.vue';
import FloweringProgress from '@/components/screen/ui/plant-progress/FloweringProgress.vue';
import { object } from 'vue-types';

export default defineComponent({
  name: 'PlantEndTimingResume',
  components: { FloweringProgress, GrowingProgress },
  props: {
    plant: object<PlantResource>().isRequired,
  },
  setup(props) {
    const leaveDay = computed((): string => {
      if (props.plant?.collectedDate) {
        return 'Collected date : ';
      }
      if (!props.plant?.startFloweringDate || !props.plant?.variety?.floTime) {
        return 'Not start flowering';
      }
      const days = Moment(props.plant.startFloweringDate)
        .add(props.plant.variety.floTime, 'd')
        .diff(Moment(), 'days');
      return days > 0 ? `${props.plant.variety.floTime - days} / ${props.plant.variety.floTime}` : 'collected';
    });

    const getFloweringDuration = computed((): number | null => {
      if (!props.plant?.collectedDate) {
        return Moment(props.plant?.startFloweringDate).diff(Moment(), 'days');
      }
      if (props.plant?.collectedDate || props.plant?.startFloweringDate) {
        return Moment(props.plant.collectedDate).diff(props.plant.startFloweringDate, 'days');
      }
      return null;
    });

    const getDryingDuration = computed((): number |null => {
      if (props.plant?.collectedDate || props.plant?.startCurringDate) {
        return Moment(props.plant.startCurringDate).diff(props.plant.collectedDate, 'days');
      }
      return null;
    });

    const getDryingFromNow = computed((): number | null => {
      if (props.plant?.startCurringDate) {
        return Moment().diff(props.plant.startCurringDate, 'days');
      }
      return null;
    });

    /**
     * Growing progress text
     */
    const growingProgressText = computed(() => {
      if (!props.plant?.startGrowingDate) {
        return 'growing not started';
      }
      const days = Moment(props.plant?.createdAt).diff(props.plant?.startGrowingDate, 'days');
      if (days > 0) {
        return `Growing complete ${days} days`;
      }
      return `growing start in ${-days} days`;
    });

    /**
     * Flowering progress text
     */
    const floweringProgressText = computed(() => {
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
      const days = Moment(props.plant?.startFloweringDate)
        .add(props.plant?.variety?.floTime, 'd')
        .diff(Moment(), 'days');

      if (variety.floTime - days > 0) {
        return `${variety.floTime - days} / ${variety.floTime} flowering`;
      }
      return `Flowering start in ${-(variety.floTime - days)} days`;
    });

    const dryingProgressText = computed(() => {
      if (props.plant?.isDrying()) {
        return `Drying ${getDryingDuration.value} / 7`;
      }
      if (props.plant?.isCurring()) {
        return `Drying complete on ${getDryingDuration.value} days`;
      }
      return 'Drying not started';
    });

    return {
      getFloweringDuration,
      floweringProgressText,
      getDryingDuration,
      getDryingFromNow,
      dryingProgressText,
      Percent,
      leaveDay,
      growingProgressText,
    };
  },
});
</script>

<style lang="scss" scoped>
.plant-end-timing-resume {

  &__progress {
    .el-progress {
      margin: 6px 0;
    }
  }
}
</style>
