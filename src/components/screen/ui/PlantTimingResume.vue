<template>
  <div class="plant-timing-resume">
    <el-row>
      <el-col :span="12">
        <div class="plant-timing-resume__flowering">
          <el-tag size="large" type="success">{{leaveDay}} Day leave</el-tag>
          <div class="plant-timing-resume__flowering-details">
            <p><span class="underline">Start flowering</span> {{ readableStartFloweringDate }}</p>
            <p><span class="underline">Cut date</span> {{cutDate}}</p>
            <p><span class="underline">Cut date average</span> {{averageCutDate}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-progress v-if="percent > 0" :percentage="percent" />
        <el-alert v-else title="Not start flowering" type="error" :closable="false"/>
      </el-col>
    </el-row>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Moment from 'moment';
import { SIMPLE_DATE, READABLE_DATE } from '@/common/DateFormatConfig';

export default defineComponent({
  name: 'PlantTimingResume',
  props: {
    startFloweringDate: {
      type: Date,
      required: true,
    },
    floTime: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const cutDate = computed(
      () => Moment(props.startFloweringDate)
        .add(props.floTime, 'd')
        .format(SIMPLE_DATE),
    );

    const averageCutDate = computed(
      () => Moment(props.startFloweringDate)
        .add(props.floTime + 10, 'd')
        .format(SIMPLE_DATE),
    );

    const leaveDay = computed(
      () => Moment(props.startFloweringDate)
        .add(props.floTime, 'd')
        .diff(Moment(), 'days'),
    );

    const percent = computed(
      () => Math.round(100 - (leaveDay.value / props.floTime) * 100),
    );

    const readableStartFloweringDate = computed(
      () => Moment(props.startFloweringDate)
        .format(READABLE_DATE),
    );

    return {
      averageCutDate,
      cutDate,
      percent,
      readableStartFloweringDate,
      leaveDay,
      Moment,
    };
  },
});
</script>

<style lang="scss" scoped>
.plant-timing-resume {

  &__flowering {
    margin: 20px 0 20px 0;

    &-details {
      margin-top: 12px;
    }

    p {
      font-size: .9em;
      line-height: 26px;
    }
  }
}
</style>
