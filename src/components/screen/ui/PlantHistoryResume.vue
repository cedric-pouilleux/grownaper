<template>
  <div class="history" v-if="history">
    <el-timeline>
      <el-timeline-item
        center
        :size="getSize(activity.action)"
        v-for="(activity, index) in history"
        :key="index"
        :type="getType(activity.action)"
        :icon="getIcon(activity.action)"
        :hollow="getHollow(activity.action)"
        :timestamp="readableDate(activity.date)">
        {{ activity.message }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { History, HistoryType } from '@/common/types';
import Moment from 'moment';
import { READABLE_DATETIME } from '@/common/DateFormatConfig';
import { Plus, Sunny } from '@element-plus/icons-vue';

const typeDef = {
  ADD: {
    color: 'primary',
    size: 'normal',
    hollow: false,
    icon: Plus,
  },
  EDIT: {
    color: 'primary',
    size: 'normal',
    hollow: true,
    icon: false,
  },
  START_FLO: {
    color: 'warning',
    size: 'large',
    hollow: false,
    icon: Sunny,
  },
};

export default defineComponent({
  name: 'PlantHistoryResume',
  props: {
    history: {
      type: Array as PropType<History[]>,
    },
  },
  setup() {
    return {
      readableDate: (date: Date): string => Moment(date).format(READABLE_DATETIME),
      getType: (type: HistoryType): string => typeDef[type].color,
      getSize: (type: HistoryType): string => typeDef[type].size,
      getHollow: (type: HistoryType): boolean => typeDef[type].hollow,
      getIcon: (type: HistoryType) => typeDef[type].icon,
    };
  },
});
</script>

<style lang="scss" scoped>
.history {
  margin: 20px;
}
</style>
