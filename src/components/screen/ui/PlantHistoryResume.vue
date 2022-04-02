<template>
  <div class="history" v-if="history">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in history"
        :key="index"
        type="primary"
        :timestamp="activity.date">
        {{ activity.message }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { History } from '@/types';

export default defineComponent({
  name: 'PlantHistoryResume',
  props: {
    history: {
      type: Array as PropType<History[]>,
    },
  },
});
</script>

<style lang="scss" scoped>
.history {
  margin: 20px;
}
</style>
