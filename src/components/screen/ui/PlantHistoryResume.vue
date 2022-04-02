<template>
  <div class="history" v-if="history">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in history"
        :key="index"
        type="primary"
        :timestamp="readableDate(activity.date)">
        {{ activity.message }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { History } from '@/common/types';
import Moment from 'moment';

export default defineComponent({
  name: 'PlantHistoryResume',
  props: {
    history: {
      type: Array as PropType<History[]>,
    },
  },
  setup() {
    return {
      readableDate: (date: Date) => Moment(date).format('dddd, MMMM Do YYYY, hh:mm'),
    };
  },
});
</script>

<style lang="scss" scoped>
.history {
  margin: 20px;
}
</style>
