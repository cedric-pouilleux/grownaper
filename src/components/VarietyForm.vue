<template>
  <el-form>
    <el-form-item label="Title">
      <el-input v-model="title" />
    </el-form-item>
    <el-form-item label="Breeders">
      <el-col :span="12">
        <el-select v-model="breeder" placeholder="please select breeder">
          <el-option v-for="optionBreeder in breederStore.all"
                  :key="optionBreeder._id"
                  :value="optionBreeder.title">
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

<script lang="ts">
import {
  defineComponent, watch, computed, PropType, ref, reactive, toRefs,
} from 'vue';
import axios from 'axios';
import VarietyStore from '@/store/varieties';
import BreederStore from '@/store/breeders';
import { Breeder, Variety } from '@/types';

export default defineComponent({
  name: 'VarietyForm',

  props: {
    selected: {
      type: Object as PropType<Variety>,
      required: false,
    },
  },

  emits: ['cancel'],

  setup(props, { emit }) {
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

    async function add(e: Event) {
      e.preventDefault();
      try {
        await axios.post(`${process.env.VUE_APP_SERVER_ADDRESS}/variety/add`, variety);
        await varietyStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    async function edit(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.put(`${process.env.VUE_APP_SERVER_ADDRESS}/variety/edit`, variety);
        await varietyStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      ...toRefs(variety),
      selectedBreeders,
      breederStore,
      edition: computed(() => !!props.selected),
      cancel: () => emit('cancel'),
      add,
      edit,
    };
  },

});

</script>

<style>
</style>
