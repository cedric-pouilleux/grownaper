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
                      type="date"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Pick a day"
                      @change="change"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="save"
                 v-if="visibleButton">Save</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch, toRef, computed,
} from 'vue';
import VarietyStore from '@/store/varieties';
import { Plant, Variety } from '@/common/types';

export default defineComponent({
  name: 'FloweringDateForm',
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
    visibleButton: Boolean,
  },
  emits: ['change', 'save'],
  setup(props, { emit }) {
    const pickedDate = ref<Date | null>(props.plant.startFloweringDate || null);
    const pickedVariety = ref<Variety | null>(props.plant.variety || null);

    const varietyStore = VarietyStore();

    watch((props.plant), (value) => {
      pickedDate.value = value.startFloweringDate || pickedDate.value;
      pickedVariety.value = value.variety || pickedVariety.value;
    });

    function change(e: Event) {
      emit('change', {
        ...props.plant,
        startFloweringDate: pickedDate.value,
        variety: pickedVariety.value,
      });
    }

    return {
      pickedDate,
      pickedVariety,
      varietyStore,
      getStartFloweringDate: computed(() => props.plant.startFloweringDate),
      getVariety: computed(() => props.plant.variety),
      change,
      save: () => {
        emit('save', {
        });
      },
    };
  },
});
</script>
