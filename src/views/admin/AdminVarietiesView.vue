<template>
  <VarietyForm :selected="selectedVariety" :opened="formOpened" @close="closeForm"/>
  <BreederForm :selected="selectedBreeder" :opened="formBreederOpened" @close="closeBreederForm"/>
  <admin-ui-navigation/>
  <el-container>
    <el-aside width="600px">
      <el-main>
        <BreedersList @edit="editBreeder" @add="addBreeder"/>
      </el-main>
    </el-aside>
    <el-main>
      <VarietiesList @edit="editVariety" @add="addVariety"/>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VarietiesList from '@/components/admin/list/VarietiesList.vue';
import BreedersList from '@/components/admin/list/BreedersList.vue';
import { Breeder, Variety } from '@/types';
import VarietyForm from '@/components/admin/form/VarietyForm.vue';
import BreederForm from '@/components/admin/form/BreederForm.vue';
import AdminUiNavigation from '@/components/admin/ui/Navigation.vue';

export default defineComponent({
  name: 'AdminVarietiesView',
  components: {
    BreederForm,
    VarietiesList,
    BreedersList,
    VarietyForm,
    AdminUiNavigation,
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
