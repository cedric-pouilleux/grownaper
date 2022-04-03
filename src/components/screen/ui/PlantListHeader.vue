<template>
  <el-header class="view-header">
    <h2>Plants ({{count}})</h2>
    <el-button type="primary"
               size="small"
               :icon="Plus"
               @click="newPlant">
      New
    </el-button>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Plus } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'PlantListHeader',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['new-plant'],
  setup(props, { emit }) {
    return {
      newPlant: () => emit('new-plant'),
      Plus,
    };
  },
});
</script>
