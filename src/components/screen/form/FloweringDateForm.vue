<template>
  <el-form label-width="120px">
    <el-form-item label="Variety">
      <el-select v-model="pickedVariety"
                 :placeholder="pickedVariety?.title || 'Your plant'"
                 @change="change">
        <el-option v-for="optVariety in varietyStore.all"
                   :key="optVariety._id"
                   :value="optVariety">
          {{optVariety.title}}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Flowering date">
      <el-date-picker v-model="pickedDate"
                      @change="change"
                      type="date"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Pick a day" />
    </el-form-item>
    <el-form-item>
      <el-button @click="save" v-if="visibleButton">Save</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import VarietyStore from '@/store/varieties';
import { Variety } from '@/common/types';

export default defineComponent({
  name: 'FloweringDateForm',
  props: {
    date: Date,
    variety: Object as PropType<Variety>,
    visibleButton: Boolean,
  },
  emits: ['change', 'save'],
  setup(props, { emit }) {
    const pickedDate = ref<Date | null>(props.date || null);
    const pickedVariety = ref<Variety | null>(props.variety || null);

    const varietyStore = VarietyStore();

    watch(() => props.date, (date) => {
      pickedDate.value = date || null;
    }, { immediate: true });

    function change() {
      emit('change', {
        date: pickedDate.value,
        variety: pickedVariety.value,
      });
    }

    return {
      pickedDate,
      varietyStore,
      pickedVariety,
      change,
      save: () => { emit('save', pickedDate.value); },
    };
  },
});
</script>
