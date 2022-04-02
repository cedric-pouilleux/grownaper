<template>
  <el-drawer v-model="drawer" direction="ltr" :before-close="handleClose">
    <template #title>
      <h2>Add plant</h2>
    </template>
    <template #default>
      <el-form label-width="120px">
        <el-form-item label="Title">
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item label="Start flowering">
          <el-date-picker v-model="startFloweringDate"
                          type="date"
                          placeholder="Pick a start flowering date" />
        </el-form-item>
        <el-form-item label="Variety">
          <el-select v-model="variety" :placeholder="variety?.title || 'Your plant'">
            <el-option v-for="optVariety in varietyStore.all"
                       :key="optVariety._id"
                       :value="optVariety">
              {{optVariety.title}}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button size="large" type="primary" @click="action">Add</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, toRefs, watch,
} from 'vue';
import { Plant } from '@/common/types';
import VarietyStore from '@/store/varieties';
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'AddPlant',
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const drawer = ref<boolean>(false);
    const varietyStore = VarietyStore();
    const plantStore = PlantStore();

    const initial = {
      name: '',
      startFloweringDate: new Date(),
      variety: undefined,
    };

    const plant = reactive<Partial<Plant>>({
      ...initial,
    });

    watch(() => props.opened, () => {
      drawer.value = props.opened;
    }, { immediate: true });

    async function action() {
      const added = await plantStore.add(plant);
      if (added) {
        ElNotification.success({
          message: `Plant : ${plant.name} has been added`,
          offset: 100,
        });
      }
    }

    return {
      drawer,
      ...toRefs(plant),
      varietyStore,
      action,
      handleClose: () => emit('close'),
    };
  },
});
</script>
