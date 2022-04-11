<template>
  <el-form-item :label="$t('growing.date')">
    <el-date-picker v-model="selectedGrowing"
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
  name: 'PlantEditionGrowingDate',
  props: {
    growingDate: string(),
  },
  emits: ['update:growing-date'],
  setup(props, { emit }) {
    const varietyStore = VarietyStore();

    const selectedGrowing: WritableComputedRef<string | undefined> = computed({
      get() {
        return props.growingDate;
      },
      set(value) {
        emit('update:growing-date', value);
      },
    });

    return {
      selectedGrowing,
      varietyStore,
    };
  },
});
</script>
