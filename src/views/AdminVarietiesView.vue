<template>

  <el-drawer v-model="drawer" :before-close="handleClose">
    <template #title>
      <h2>{{ selectedVariety ? 'Edit variety' : 'Add variety'}}</h2>
    </template>
    <template #default>
      <VarietyForm v-model:selected="selectedVariety" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button size="large" type="primary" @click="confirmClick">Save</el-button>
      </div>
    </template>
  </el-drawer>

  <el-menu
    router
    class="el-menu-demo"
    mode="horizontal"
    background-color="#333"
    text-color="#fff"
    active-text-color="#ff0000"
  >
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
    const drawer = ref<boolean>(false);
    const selectedVariety = ref<Variety | null>(null);

    function editVariety(variety: Variety) {
      drawer.value = true;
      selectedVariety.value = variety;
    }

    function addVariety(variety: Variety) {
      drawer.value = true;
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
      selectedVariety.value = null;
      drawer.value = false;
    }

    return {
      editVariety,
      addVariety,
      drawer,
      confirmClick,
      selectedVariety,
      handleClose,
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
