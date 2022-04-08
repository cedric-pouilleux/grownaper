<template>
  <div class="plant-end-timing-resume">
    <el-row>
      <el-col :span="10">
        {{ leaveDay }}
      </el-col>
      <el-col :span="14">
        <el-progress :text-inside="true"
                     :percentage="100"
                     :stroke-width="16"
                     status="success">
          {{growingProgressText}}
        </el-progress>
        <el-progress :text-inside="true"
                     :percentage="100"
                     :stroke-width="16"
                     status="success">
          {{floweringProgressText}}
        </el-progress>
        <el-progress :text-inside="true"
                     :stroke-width="16"
                     :percentage="Percent(getDryingDuration, 7)"
                     status="success">
          Drying
          {{getDryingDuration}} / 7
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

export default defineComponent({
  name: 'PlantEndTimingResume',
  props: {
    plant: {
      type: PlantResource,
      require: true,
    },
  },
  setup(props) {
    const floweringProgressText = computed(() => {
      if (!props.plant) {
        return null;
      }
      const { variety, startFloweringDate, collectedDate } = props.plant;

      // Missed variety or not started
      if (!variety || !startFloweringDate) {
        return 'Flowering not started';
      }

      // is-complete
      if (props.plant.isDrying() || props.plant.isCurring()) {
        const date = Moment(collectedDate).diff(startFloweringDate, 'days');
        return `complete ${date}/${variety.floTime}`;
      }

      // is-current
      const days = Moment(props.plant?.startFloweringDate)
        .add(props.plant?.variety?.floTime, 'd')
        .diff(Moment(), 'days');
      return `${variety.floTime - days}/${variety.floTime} flowering`;
    });

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
      return days > 0 ? `${props.plant.variety.floTime - days}/${props.plant.variety.floTime}` : 'collected';
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

    const growingProgressText = computed(() => {
      if (props.plant?.isGrowing()) {
        return Moment(props.plant?.createdAt).diff(props.plant?.startGrowingDate, 'days');
      }
      return '';
    });

    return {
      getFloweringDuration,
      floweringProgressText,
      getDryingDuration,
      getDryingFromNow,
      Percent,
      leaveDay,
      growingProgressText,
    };
  },
});
</script>

<style lang="scss" scoped>
.plant-end-timing-resume {
  > div {
    margin: 6px 0;
  }
}
</style>
