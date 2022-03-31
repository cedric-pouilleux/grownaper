<template>
  <el-drawer v-model="drawer" :before-close="handleClose">
    <template #title>
      <h2>{{ selected ? 'Edit variety' : 'Add variety'}}</h2>
    </template>
    <template #default>
      <el-form label-width="120px">
        <el-form-item label="Title">
          <el-input v-model="title" />
        </el-form-item>
        <el-form-item label="Breeders">
          <el-col :span="12">
            <el-select v-model="breeder" :placeholder="breeder?.title || 'Your breeder'">
              <el-option v-for="optionBreeder in breederStore.all"
                         :key="optionBreeder._id"
                         :value="optionBreeder">
                {{optionBreeder.title}}
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Phenotype">
              <el-input v-model="phenotype" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-checkbox v-model="feminized" label="Feminized" name="feminized" />
            <el-checkbox v-model="automatic" label="Automatic" name="automatic" />
          </el-col>
          <el-col :span="12">
            <el-form-item label="Flowering time">
              <el-input v-model="floTime" />
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button size="large" type="primary" @click="action">
          {{ selected ? 'Save' : 'Add'}}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import {
  defineComponent, watch, computed, PropType, ref, reactive, toRefs,
} from 'vue';
import VarietyStore from '@/store/varieties';
import BreederStore from '@/store/breeders';
import { Breeder, Variety } from '@/types';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'VarietyForm',

  props: {
    selected: {
      type: Object as PropType<Variety>,
      required: false,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['cancel', 'close'],

  setup(props, { emit }) {
    const drawer = ref<boolean>(false);
    const varietyStore = VarietyStore();
    const breederStore = BreederStore();
    const selectedBreeders = ref<Breeder[]>([]);

    const empty = {
      title: '',
      feminized: false,
      automatic: false,
      phenotype: 1,
      breeder: undefined,
      floTime: 70,
    };

    const variety = reactive<Partial<Variety>>({
      ...empty,
    });

    watch(() => props.selected, (value) => {
      Object.assign(variety, value || empty);
    }, { immediate: true });

    watch(() => props.opened, () => {
      drawer.value = props.opened;
    }, { immediate: true });

    async function action(): Promise<void> {
      if (props.selected) {
        const edited = await varietyStore.edit(variety);
        if (edited) {
          ElNotification.success({
            message: `ID : ${variety.title} has been edited`,
            offset: 100,
          });
        }
      } else {
        const added = await varietyStore.add(variety);
        if (added) {
          ElNotification.success({
            message: `ID : ${variety.title} has been added`,
            offset: 100,
          });
        }
      }
      emit('close');
    }

    function handleClose() {
      emit('close');
    }

    return {
      ...toRefs(variety),
      selectedBreeders,
      breederStore,
      edition: computed(() => !!props.selected),
      cancel: () => emit('cancel'),
      drawer,
      handleClose,
      action,
    };
  },

});
</script>
