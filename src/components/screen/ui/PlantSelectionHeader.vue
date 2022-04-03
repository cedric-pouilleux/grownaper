<template>
  <el-header class="view-header">
    <h2>{{ name || 'Selected plant' }}</h2>
    <div class="view-header__tools">
      <el-popconfirm title="Are you sure to delete this ?"
                     @confirm="removePlant">
        <template #reference>
          <el-button size="small"
                     type="danger"
                     style="width: 100%;">
            Remove plant
          </el-button>
        </template>
      </el-popconfirm>
    </div>
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
  setup(props, { emit }) {
    return {
      removePlant: () => emit('remove'),
    };
  },
});
</script>
