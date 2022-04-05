<template>
  <el-card shadow="never" class="plant-note">
    <el-header class="view-header view-header__small">
      <h3>Notes ({{ notes.length }})</h3>
      <div>
        <el-button size="small" type="primary" round>Add note</el-button>
      </div>
    </el-header>
    <div class="" v-if="notes.length">
    </div>
    <el-alert v-else title="This plant don't have note" :closable="false"/>
  </el-card>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { Note } from '@/common/types';

export default defineComponent({
  name: 'PlantNote',
  props: {
    notes: Array as PropType<Note[]>,
  },
});
</script>
