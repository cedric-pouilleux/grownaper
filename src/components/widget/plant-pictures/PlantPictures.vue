<template>
  <el-card shadow="never" class="plant-pictures">
    <el-header class="view-header view-header__small">
      <h3>Picture ({{pictures.length}})</h3>
      <div>
        <el-button size="small" type="primary" round>Add picture</el-button>
      </div>
    </el-header>
    <div v-if="pictures.length">
    </div>
    <el-alert v-else title="This plant don't have pictures" :closable="false"/>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'PlantPictures',
  props: {
    pictures: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
});
</script>
