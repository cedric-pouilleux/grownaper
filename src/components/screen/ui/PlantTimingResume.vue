<template>
  <div class="plant-timing-resume">
    <div class="plant-timing-resume__flowering">
      <el-row v-if="percent > 0" justify="center" align="middle" :gutter="40">
        <el-col :span="8">
          <el-tag effect="plain" size="large">
            {{floTime - leaveDay}} / {{floTime}} days
          </el-tag>
        </el-col>
        <el-col :span="16">
          <el-progress :percentage="percent" />
        </el-col>
      </el-row>
      <el-alert v-else title="Not start flowering" type="error" :closable="false"/>
      <br/>
      <div v-if="startFloweringDate" class="plant-timing-resume__flowering-details">
        <p v-if="percent > 0">
          <span class="underline"> Breeding estimate flowering days</span> {{floTime}},
          {{leaveDay}} <span class="underline"> left</span>
        </p>
        <p><span class="underline">Start flowering</span> {{ readableStartFloweringDate }}</p>
        <p><span class="underline">Cut date</span> {{cutDate}}</p>
        <p><span class="underline">Cut date average</span> {{averageCutDate}}</p>
      </div>
      <el-alert v-else title="Not chose flowering starting day" type="error" :closable="false"/>
    </div>
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
      type: String,
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
