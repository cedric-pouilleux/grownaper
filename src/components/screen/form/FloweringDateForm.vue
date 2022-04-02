<template>
  <el-form label-width="120px">
    <el-form-item label="Flowering date">
      <el-date-picker v-model="pickedDate"
                      @change="change"
                      type="date"
                      placeholder="Pick a day" />
    </el-form-item>
    <el-form-item>
      <el-button @click="save">Save</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'FloweringDateForm',
  props: {
    date: {
      type: Date,
    },
  },
  emits: ['change', 'save'],
  setup(props, { emit }) {
    const pickedDate = ref<Date | null>(props.date || null);

    watch(() => props.date, (date) => {
      pickedDate.value = date || null;
    }, { immediate: true });

    return {
      pickedDate,
      change: () => { emit('change', pickedDate.value); },
      save: () => { emit('save', pickedDate.value); },
    };
  },
});
</script>
