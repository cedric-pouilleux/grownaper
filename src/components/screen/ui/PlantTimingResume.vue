<template>
  <div class="plant-timing-resume">
    <div v-if="plant.startFloweringDate && plant.variety.floTime" class="plant-timing-resume__success">
      <el-row v-if="percent > 0" :gutter="40">
        <el-col :span="6">
          <el-progress type="circle"
                       :width="90"
                       :percentage="percent"
                       :status="plant.collectedDate ? 'success' : ''">
            {{ percentText }}
          </el-progress>
        </el-col>
        <el-col :span="16">
          <div v-if="plant.startFloweringDate && !plant.collected" class="plant-timing-resume__flowering-details">
            <p v-if="leaveDay > 0">{{leaveDay}} <span class="underline">days left</span></p>
            <p v-if="leaveDay < 0">{{-leaveDay}} <span class="underline"> Ripe days</span></p>
            <p v-if="percent > 0"><span class="underline"> Breeding flowering days</span> {{floTime}}</p>
            <br/>
            <p><span class="underline">Start flowering</span> {{ readableStartFloweringDate }}</p>
            <p><span class="underline">Cut date</span> {{cutDate}}</p>
            <p><span class="underline">Cut date average</span> {{averageCutDate}}</p>
          </div>
          <template v-if="plant.collected">
            <p><span class="underline">Collected since</span> {{readableCollected}}</p>
          </template>
          <el-alert v-if="!plant.startFloweringDate"
                    title="Not chose flowering starting day"
                    type="error"
                    :closable="false"/>
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
import { computed, defineComponent, PropType } from 'vue';
import Moment from 'moment';
import { READABLE_DATE, SIMPLE_DATE } from '@/common/DateFormatConfig';
import { Percent } from '@/common/utils';
import PlantResource from '@/resources/PlantResource';

export default defineComponent({
  name: 'PlantTimingResume',
  props: {
    plant: PlantResource,
  },
  setup(props) {
    const readableCollected = computed((): string | null => {
      if (props.plant?.collectedDate) {
        return Moment(props.plant.collectedDate).format(READABLE_DATE);
      }
      return null;
    });

    const cutDate = computed((): string | null => {
      if (!props.plant?.startFloweringDate || !props.plant?.variety?.floTime) {
        return null;
      }
      return Moment(props.plant.startFloweringDate)
        .add(props.plant.variety.floTime, 'd')
        .format(SIMPLE_DATE);
    });

    const averageCutDate = computed((): string | null => {
      if (!props.plant?.startFloweringDate || !props.plant?.variety?.floTime) {
        return null;
      }
      return Moment(props.plant.startFloweringDate)
        .add(props.plant.variety.floTime + 10, 'd')
        .format(SIMPLE_DATE);
    });

    const leaveDay = computed((): number | null => {
      if (!props.plant?.startFloweringDate || !props.plant?.variety?.floTime) {
        return null;
      }
      const days = Moment(props.plant.startFloweringDate)
        .add(props.plant.variety.floTime, 'd')
        .diff(Moment(), 'days');
      return days > 0 ? days : 0;
    });

    const percent = computed((): number | null => {
      if (props.plant?.collectedDate) {
        return 100;
      }
      if (leaveDay.value == null || !props.plant?.variety?.floTime) {
        return null;
      }
      return 100 - Percent(leaveDay.value, props.plant.variety.floTime);
    });

    const readableStartFloweringDate = computed((): string | null => {
      if (!props.plant?.startFloweringDate) {
        return null;
      }
      return Moment(props.plant.startFloweringDate).format(SIMPLE_DATE);
    });

    const percentText = computed((): string | null => {
      if (props.plant?.startFloweringDate == null || props.plant?.variety?.floTime == null || leaveDay.value == null) {
        return null;
      }
      if (leaveDay.value <= 0 || props.plant?.collectedDate) {
        return 'Collected';
      }
      return `${props.plant.variety.floTime - leaveDay.value} / ${props.plant.variety.floTime} days`;
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
