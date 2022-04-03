<template>
  <el-header class="view-header">
      <h2>{{ name || 'Selected plant' }}</h2>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlantSelectionHeader',
  props: {
    name: {
      type: String,
      require: true,
    },
  },
});
</script>
