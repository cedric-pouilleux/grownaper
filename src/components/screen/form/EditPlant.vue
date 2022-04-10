<template>
  <el-form size="small"
           class="edit-plant-form"
           label-width="110px">
    <el-form-item label="Name" >
      <el-input type="text" v-model="selectedName" clearable @input="change" style="{ width: 100%; }">
        <template #append>
          <el-button type="primary" @click="refreshName">
            Randomise
          </el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Variety">
      <el-select v-model="selectedVariety" style="{ width: 100%; }"
                 :placeholder="selectedVariety?.title || 'Your plant'"
                 @change="change">
        <el-option v-for="optVariety in varietyStore.all"
                   :key="optVariety._id"
                   :value="optVariety">
          {{optVariety.title}}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!plant.isFlowering()"
                  label="Growing date">
      <el-date-picker v-model="selectedGrowingDate"
                      type="date"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Pick a day"
                      @change="change"/>
    </el-form-item>
    <el-form-item v-if="!plant.collectedDate"
                  label="Flowering date">
      <el-date-picker v-model="selectedDate"
                      type="date"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Pick a day"
                      @change="change"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="handleSave"
                 v-if="canSave">Save</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import VarietyStore from '@/store/varieties';
import { Refresh } from '@element-plus/icons-vue';
import { Variety } from '@/common/types';
import NameGenerator from '@/common/NameGenerator';
import PlantResource from '@/resources/PlantResource';

export default defineComponent({
  name: 'FloweringDateForm',
  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
    canSave: Boolean,
  },
  emits: ['change', 'save'],
  setup(props, { emit }) {
    const varietyStore = VarietyStore();

    const selectedVariety = ref<Variety | null>(props.plant.variety || null);
    const selectedName = ref<string | null>(props.plant.name || null);
    const selectedDate = ref<Date | null>(props.plant.startFloweringDate || null);
    const selectedGrowingDate = ref<Date | null>(props.plant.startGrowingDate || null);

    watch(() => props.plant, (plant: PlantResource): void => {
      selectedDate.value = plant.startFloweringDate || null;
      selectedGrowingDate.value = plant.startGrowingDate || null;
      selectedVariety.value = plant.variety || selectedVariety.value;
      selectedName.value = plant.name || selectedName.value;
    });

    function change() {
      emit('change', {
        ...props.plant,
        startFloweringDate: selectedDate.value,
        startGrowingDate: selectedGrowingDate.value,
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
        ...props.plant,
        startFloweringDate: selectedDate.value,
        startGrowingDate: selectedGrowingDate.value,
        variety: selectedVariety.value,
        name: selectedName.value,
      });
    }

    return {
      selectedDate,
      selectedVariety,
      selectedName,
      selectedGrowingDate,
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
  padding-top: 12px;
}

.el-select {
  width: 100%
}
</style>
