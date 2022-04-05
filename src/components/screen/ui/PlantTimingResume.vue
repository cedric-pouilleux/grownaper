<template>
  <div class="plant-timing-resume">
    <div v-if="startFloweringDate && floTime" class="plant-timing-resume__success">
      <el-row v-if="percent > 0" :gutter="40">
        <el-col :span="6">
          <el-progress type="circle"
                       :width="90"
                       :percentage="percent"
                       :status="collected ? 'success' : ''">
            {{ percentText }}
          </el-progress>
        </el-col>
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
          <template v-if="collected">
            <p><span class="underline">Collected since</span> {{readableCollected}}</p>
          </template>
          <el-alert v-if="!startFloweringDate" title="Not chose flowering starting day" type="error" :closable="false"/>
        </el-col>
      </el-row>
      <el-alert v-else title="Not start flowering" type="error" :closable="false"/>
      <br/>
    </div>
    <div class="plant-timing-resume__props-error" v-else>
      <el-alert title="Problems with data, this component need startFloweringDate and floTime for work"
                type="error"
                :closable="false"/>
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
    },
    floTime: {
      type: Number,
    },
    collected: {
      type: [String, Boolean],
    },
  },
  setup(props) {
    const readableCollected = computed((): string | null => {
      if (typeof props.collected === 'string') {
        return Moment(props.collected).format(READABLE_DATE);
      }
      return null;
    });

    const cutDate = computed((): string | null => {
      if (props.startFloweringDate == null || props.floTime == null) {
        return null;
      }
      return Moment(props.startFloweringDate)
        .add(props.floTime, 'd')
        .format(SIMPLE_DATE);
    });

    const averageCutDate = computed((): string | null => {
      if (props.startFloweringDate == null || props.floTime == null) {
        return null;
      }
      return Moment(props.startFloweringDate)
        .add(props.floTime + 10, 'd')
        .format(SIMPLE_DATE);
    });

    const leaveDay = computed((): number | null => {
      if (props.startFloweringDate == null || props.floTime == null) {
        return null;
      }
      const days = Moment(props.startFloweringDate)
        .add(props.floTime, 'd')
        .diff(Moment(), 'days');
      return days > 0 ? days : 0;
    });

    const percent = computed((): number | null => {
      if (props.collected) {
        return 100;
      }
      if (leaveDay.value == null || props.floTime == null) {
        return null;
      }
      return Math.round(100 - (leaveDay.value / props.floTime) * 100);
    });

    const readableStartFloweringDate = computed((): string | null => {
      if (props.startFloweringDate == null) {
        return null;
      }
      return Moment(props.startFloweringDate).format(SIMPLE_DATE);
    });

    const percentText = computed((): string | null => {
      if (props.startFloweringDate == null || props.floTime == null || leaveDay.value == null) {
        return null;
      }
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
      leaveDay,
      percentText,
    };
  },
});
</script>

<style lang="scss" scoped>
.plant-timing-resume {

  &__success {

    p {
      font-size: .8em;
      line-height: 26px;
    }
  }
}
</style>
