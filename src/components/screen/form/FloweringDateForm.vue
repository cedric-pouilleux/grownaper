<template>
  <div class="edit-plant-form">
    <el-form size="small" class="edit-plant-form" inline>
      <el-form-item label="Name">
        <el-input type="text" v-model="selectedName" clearable @input="change">
          <template #append>
            <el-button :icon="Refresh" type="primary" @click="refreshName"/>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Variety">
        <el-select v-model="selectedVariety"
                   :placeholder="selectedVariety?.title || 'Your plant'"
                   @change="change">
          <el-option v-for="optVariety in varietyStore.all"
                     :key="optVariety._id"
                     :value="optVariety">
            {{optVariety.title}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="!plant.collected && 'Flowering date'">
        <el-date-picker v-model="selectedDate"
                        v-if="!plant.collected"
                        type="date"
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
                        placeholder="Pick a day"
                        @change="change"/>
        <el-button style="margin-left: 12px"
                   type="primary"
                   @click="handleSave"
                   v-if="canSave">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import VarietyStore from '@/store/varieties';
import { Refresh } from '@element-plus/icons-vue';
import { Plant, Variety } from '@/common/types';
import NameGenerator from '@/common/NameGenerator';

export default defineComponent({
  name: 'FloweringDateForm',
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
    canSave: Boolean,
  },
  emits: ['change', 'save'],
  setup(props, { emit }) {
    const varietyStore = VarietyStore();

    const selectedDate = ref<Date | null>(props.plant.startFloweringDate || null);
    const selectedVariety = ref<Variety | null>(props.plant.variety || null);
    const selectedName = ref<string | null>(props.plant.name || null);

    watch(props.plant, (plant: Plant): void => {
      selectedDate.value = plant.startFloweringDate || selectedDate.value;
      selectedVariety.value = plant.variety || selectedVariety.value;
      selectedName.value = plant.name || selectedName.value;
    });

    function change() {
      emit('change', {
        startFloweringDate: selectedDate.value,
        variety: selectedVariety.value,
        name: selectedName.value,
      });
    }

    function refreshName() {
      selectedName.value = NameGenerator.generateName();
      change();
    }

    async function handleSave() {
      emit('save', {
        startFloweringDate: selectedDate.value,
        variety: selectedVariety.value,
        name: selectedName.value,
      });
    }

    return {
      selectedDate,
      selectedVariety,
      selectedName,
      varietyStore,
      change,
      handleSave,
      refreshName,
      Refresh,
    };
  },
});
</script>

<style lang="scss" scoped>
.edit-plant-form {
  background-color: #ebebeb;
  padding: 10px 0 0 6px;
  margin: 0 12px;
}
</style>
