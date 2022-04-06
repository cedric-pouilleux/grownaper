<template>
  <el-header class="view-header">
    <h2>History</h2>
    <div class="tools">
      <el-select v-model="historyMode"
                 placeholder="Select"
                 size="small"
                 @change="changeHistoryMode">
        <el-option label="Display All" value="ALL"/>
        <el-option label="Display per day" value="PER_DAYS"/>
      </el-select>
    </div>
  </el-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { historyDisplayMode } from '@/common/types';

export default defineComponent({
  name: 'PlantHistoryHeader',
  emits: ['change-history-mode'],
  setup(pros, { emit }) {
    const historyMode = ref<historyDisplayMode>('PER_DAYS');
    return {
      historyMode,
      changeHistoryMode: () => emit('change-history-mode', historyMode.value),
      ALL: 'ALL',
      PER_DAYS: 'PER_DAYS',
    };
  },
});
</script>

<style lang="scss" scoped>
.tools {
  width: 140px;
}
</style>
