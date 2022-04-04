<template>
  <div class="plant-timing-resume">
    <div class="plant-timing-resume__flowering">
      <el-row v-if="percent > 0" :gutter="40">
        <el-col :span="16">
          <div v-if="startFloweringDate && !collected" class="plant-timing-resume__flowering-details">
            <p v-if="leaveDay > 0">{{leaveDay}} <span class="underline">days left</span></p>
            <p v-if="leaveDay < 0">{{-leaveDay}} <span class="underline"> Ripe days</span></p>
            <p v-if="percent > 0"><span class="underline"> Breeding flowering days</span> {{floTime}}</p>
            <br/>
            <p><span class="underline">Start flowering</span> {{ readableStartFloweringDate }}</p>
            <p><span class="underline">Cut date</span> {{cutDate}}</p>
            <p><span class="underline">Cut date average</span> {{averageCutDate}}</p>
          </div>
          <div v-if="collected">
            <p><span class="underline">Collected since</span> {{readableCollected}}</p>
          </div>
          <el-alert v-if="!startFloweringDate" title="Not chose flowering starting day" type="error" :closable="false"/>
        </el-col>
        <el-col :span="8">
          <el-progress type="circle"
                       width="90"
                       :percentage="percent"
                       :status="collected && 'success'">
            {{ percentText }}
          </el-progress>
        </el-col>
      </el-row>
      <el-alert v-else title="Not start flowering" type="error" :closable="false"/>
      <br/>
    </div>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Moment from 'moment';
import { READABLE_DATE, SIMPLE_DATE } from '@/common/DateFormatConfig';

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
    collected: {
      type: Date,
      default: null,
    },
  },
  setup(props) {
    const readableCollected = computed(() => Moment(props.collected).format(READABLE_DATE));

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

    const percent = computed(() => {
      if (props.collected) {
        return 100;
      }
      return Math.round(100 - (leaveDay.value / props.floTime) * 100);
    });

    const collectedSince = computed(() => '');

    const readableStartFloweringDate = computed(
      () => Moment(props.startFloweringDate)
        .format(SIMPLE_DATE),
    );

    const percentText = computed(() => {
      if (leaveDay.value <= 0 || props.collected) {
        return 'Collected';
      }
      return `${props.floTime - leaveDay.value} / ${props.floTime} days`;
    });

    return {
      averageCutDate,
      cutDate,
      percent,
      readableStartFloweringDate,
      readableCollected,
      collectedSince,
      leaveDay,
      percentText,
    };
  },
});
</script>

<style lang="scss" scoped>
.plant-timing-resume {

  &__flowering {

    p {
      font-size: .8em;
      line-height: 26px;
    }
  }
}
</style>
