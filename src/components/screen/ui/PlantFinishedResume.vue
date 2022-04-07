<template>
  <el-card shadow="never" class="plant-finished-resume">
    <el-header class="view-header view-header__small">
      <h3>Collected result</h3>
    </el-header>
    {{plant.weight}} gr
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Plant } from '@/common/types';

export default defineComponent({
  name: 'PlantFinishedResume',
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
});
</script>
