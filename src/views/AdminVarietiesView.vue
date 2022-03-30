<template>

  <VarietyForm :selected="selectedVariety"
               :opened="formOpened"
               @close="closeForm"/>
  <BreederForm :selected="selectedBreeder"
               :opened="formBreederOpened"
               @close="closeBreederForm"/>

  <el-menu router
           mode="horizontal"
           background-color="#333"
           text-color="#fff"
           active-text-color="#ff0000">
    <el-menu-item :index="{ name: 'AdminVarieties' }">Varieties & Breeders</el-menu-item>
    <el-menu-item :index="{ name: 'AdminFeeders' }">Feeders & Products</el-menu-item>
  </el-menu>

  <el-container>
    <el-aside width="400px">
      <BreedersList @edit="editBreeder" @add="addBreeder"/>
    </el-aside>
    <el-main>
      <VarietiesList @edit="editVariety" @add="addVariety"/>
    </el-main>
  </el-container>

</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import VarietiesList from '@/components/VarietiesList.vue';
import BreedersList from '@/components/BreedersList.vue';
import { Breeder, Variety } from '@/types';
import VarietyForm from '@/components/VarietyForm.vue';
import BreederForm from '@/components/BreederForm.vue';

export default defineComponent({
  name: 'AdminVarietiesView',
  components: {
    BreederForm,
    VarietiesList,
    BreedersList,
    VarietyForm,
  },
  setup() {
    const selectedVariety = ref<Variety | null>(null);
    const selectedBreeder = ref<Breeder | null>(null);
    const formOpened = ref<boolean>(false);
    const formBreederOpened = ref<boolean>(false);

    function editVariety(variety: Variety) {
      formOpened.value = true;
      selectedVariety.value = variety;
    }

    function editBreeder(breeder: Breeder) {
      formBreederOpened.value = true;
      selectedBreeder.value = breeder;
    }

    function addVariety() {
      formOpened.value = true;
    }

    function addBreeder() {
      console.log('add');
      formBreederOpened.value = true;
    }

    function closeForm() {
      selectedVariety.value = null;
      formOpened.value = false;
    }

    function closeBreederForm() {
      selectedBreeder.value = null;
      formBreederOpened.value = false;
    }

    return {
      editVariety,
      editBreeder,
      addVariety,
      addBreeder,
      formOpened,
      formBreederOpened,
      selectedVariety,
      selectedBreeder,
      closeForm,
      closeBreederForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
