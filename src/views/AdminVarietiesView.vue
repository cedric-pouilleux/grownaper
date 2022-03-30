<template>
  <VarietyForm :selected="selectedVariety"
               :opened="formOpened"
               @close="closeForm"/>
  <el-menu router class="el-menu-demo" mode="horizontal"
    background-color="#333" text-color="#fff" active-text-color="#ff0000">
    <el-menu-item index="/admin/varieties">Varieties & Breeders</el-menu-item>
    <el-menu-item index="/admin/feeders">Feeders & Products</el-menu-item>
  </el-menu>
  <el-container>
    <el-aside width="400px">
      <BreedersList @edit="editBreeder"/>
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
import { Variety } from '@/types';
import { ElMessageBox } from 'element-plus';
import VarietyForm from '@/components/VarietyForm.vue';

export default defineComponent({
  name: 'AdminVarietiesView',
  components: {
    VarietiesList,
    BreedersList,
    VarietyForm,
  },
  setup() {
    const selectedVariety = ref<Variety | null>(null);
    const formOpened = ref<boolean>(false);

    function editVariety(variety: Variety) {
      formOpened.value = true;
      selectedVariety.value = variety;
    }

    function addVariety(variety: Variety) {
      formOpened.value = true;
    }

    function closeForm() {
      selectedVariety.value = false;
      formOpened.value = false;
    }

    return {
      editVariety,
      addVariety,
      formOpened,
      selectedVariety,
      closeForm,
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
