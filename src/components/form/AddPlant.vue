<template>
  <el-drawer v-model="drawer" direction="ltr" :before-close="handleClose">
    <template #title>
      <h2>Add plant</h2>
    </template>
    <template #default>
      <el-form label-width="120px">
        <el-form-item label="Title">
          <el-input type="text" v-model="name" clearable style="{ width: 100%; }">
            <template #append>
              <el-button type="primary" @click="refreshName">
                Randomise
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Start growing">
          <el-date-picker v-model="startGrowingDate"
                          type="date"
                          placeholder="Pick a start growing date" />
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
        <el-form-item label="Products">

          <el-checkbox-group v-model="products">
            <el-checkbox v-for="product in feederProductStore.all"
                         :key="product.slug"
                         :label="product"
                         size="small">
              {{product.title}}
            </el-checkbox>
          </el-checkbox-group>
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
import VarietyStore from '@/store/varieties';
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';
import NameGenerator from '@/common/NameGenerator';
import PlantResource from '@/resources/PlantResource';
import FeederProductStore from '@/store/feeders-products';

export default defineComponent({
  name: 'AddPlant',
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'add'],
  setup(props, { emit }) {
    const drawer = ref<boolean>(false);
    const varietyStore = VarietyStore();
    const plantStore = PlantStore();
    const feederProductStore = FeederProductStore();

    function generateInitial() {
      return {
        name: NameGenerator.generateName(),
        startFloweringDate: undefined,
        startGrowingDate: undefined,
        startCurringDate: undefined,
        products: [],
        variety: undefined,
      };
    }

    const plant = reactive<Partial<PlantResource>>(generateInitial());

    watch(() => props.opened, () => {
      drawer.value = props.opened;
    }, { immediate: true });

    async function action() {
      const added = await plantStore.add(plant);
      if (added) {
        emit('add', added);
        ElNotification.success({
          message: `PlantResource : ${plant.name} has been added`,
          offset: 100,
        });
      }
      Object.assign(plant, generateInitial());
    }

    function refreshName() {
      plant.name = NameGenerator.generateName();
    }

    return {
      drawer,
      ...toRefs(plant),
      feederProductStore,
      varietyStore,
      action,
      refreshName,
      handleClose: () => emit('close'),
    };
  },
});
</script>
