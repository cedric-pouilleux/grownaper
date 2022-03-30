<template>
  <el-drawer v-model="drawer" :before-close="handleClose">
    <template #title>
      <h2>{{ selected ? 'Edit variety' : 'Add variety'}}</h2>
    </template>
    <template #default>
      <el-form>
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
        <el-button v-if="selected" size="large" type="primary" @click="edit">Save</el-button>
        <el-button v-else size="large" type="primary" @click="add">Add</el-button>
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
import { ElMessageBox } from 'element-plus';

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

    function add() {
      varietyStore.add(variety);
    }

    function edit() {
      varietyStore.edit(variety);
    }

    function confirmClick() {
      ElMessageBox.confirm('Do you really want edit')
        .then(() => {
          drawer.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
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
      add,
      edit,
      confirmClick,
      drawer,
      handleClose,
    };
  },

});

</script>

<style>
</style>
