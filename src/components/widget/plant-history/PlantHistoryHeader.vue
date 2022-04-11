<template>
  <el-header class="view-header">
    <h2>{{ $t('plant.history.widget.title') }}</h2>
    <div class="tools">
      <el-select v-model="historyMode"
                 placeholder="Select"
                 size="small"
                 @change="changeHistoryMode"
                 style="">
        <el-option :label="$t('plant.history.widget.display.all')" value="ALL"/>
        <el-option :label="$t('plant.history.widget.display.day')" value="PER_DAYS"/>
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
  width: 110px;
}
</style>
