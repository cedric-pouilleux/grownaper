<template>
  <div class="plant-end-timing-resume">
    <el-row>
      <el-col :span="8">
        <el-progress type="circle"
                     :width="90"
                     :percentage="100"
                     status="success">
          <p>Flowering</p>
          {{getFloweringDuration}} / {{plant.variety.floTime}}
        </el-progress>
      </el-col>
      <el-col :span="8">
        <el-progress type="circle"
                     :width="90"
                     :percentage="Percent(getDryingDuration, 7)"
                     status="success">
          <p>Drying</p>
          {{getDryingDuration}} / 7
        </el-progress>
      </el-col>
      <el-col :span="8">
        <el-progress type="circle"
                     :width="90"
                     :percentage="Percent(getDryingFromNow, 60)"
                     status="success">
          <p>Curring</p>
          {{getDryingFromNow}} / 60
        </el-progress>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Plant } from '@/common/types';
import Moment from 'moment';
import { Percent } from '@/common/utils';

export default defineComponent({
  name: 'PlantEndTimingResume',
  props: {
    plant: {
      type: Object as PropType<Plant>,
      require: true,
    },
  },
  setup(props) {
    const getFloweringDuration = computed((): number | null => {
      if (props.plant.collected || props.plant.startFloweringDate) {
        return Moment(props.plant.collected).diff(props.plant.startFloweringDate, 'days');
      }
      return null;
    });

    const getDryingDuration = computed((): number |null => {
      if (!props.plant.collected || !props.plant?.startCurringDate) {
        return null;
      }
      return Moment(props.plant.startCurringDate).diff(props.plant.collected, 'days');
    });

    const getDryingFromNow = computed((): number | null => Moment().diff(props.plant.startCurringDate, 'days'));

    return {
      getFloweringDuration,
      getDryingDuration,
      getDryingFromNow,
      Percent,
    };
  },
});
</script>
