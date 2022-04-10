<template>
  <el-form-item label="Flowering date">
    <el-date-picker v-model="selectedFlowering"
                    type="date"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    placeholder="Pick a day"/>
  </el-form-item>
</template>

<script lang="ts">
import {
  computed, defineComponent, WritableComputedRef,
} from 'vue';
import VarietyStore from '@/store/varieties';
import { string } from 'vue-types';

export default defineComponent({
  name: 'PlantEditionFloweringDate',
  props: {
    floweringDate: string(),
  },
  emits: ['update:flowering-date'],
  setup(props, { emit }) {
    const varietyStore = VarietyStore();

    const selectedFlowering: WritableComputedRef<string> = computed({
      get() {
        return props.floweringDate;
      },
      set(value) {
        emit('update:flowering-date', value);
      },
    });

    return {
      selectedFlowering,
      varietyStore,
    };
  },
});
</script>
