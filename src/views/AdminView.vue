<template>

  <el-menu
    router
    mode="horizontal"
    background-color="#333"
    text-color="#fff"
    active-text-color="#ff0000"
  >
    <el-menu-item :index="{ name: 'AdminVarieties' }">Varieties & Breeders</el-menu-item>
    <el-menu-item :index="{ name: 'AdminFeeders' }">Feeders & Products</el-menu-item>
  </el-menu>

  <VarietiesList @edit="editVariety"/>
  <div class="grid">
    <div>
      <BreederForm :selected="selectedBreeder" @cancel="cancelBreederSelection"/>
      <BreedersList @edit="editBreeder"/>
    </div>
    <div>
      <VarietyForm :selected="selectedVariety" @cancel="cancelVarietySelection"/>
      <VarietiesList @edit="editVariety"/>
    </div>
    <div>
      <FeederForm :selected="selectedFeeder" @cancel="cancelFeederSelection"/>
      <FeederList @edit="editFeeder"/>
    </div>
    <div>
      <FeederProductForm :selected="selectedFeederProduct" @cancel="cancelFeederProductSelection" />
      <FeederProductList @edit="editFeederProduct"/>
    </div>
  </div>
</template>

<script lang="ts">
import BreedersList from '@/components/BreedersList.vue';
import BreederForm from '@/components/BreederForm.vue';
import VarietiesList from '@/components/VarietiesList.vue';
import { defineComponent, ref } from 'vue';
import {
  Breeder, Feeder, FeederProduct, Variety,
} from '@/types';
import VarietyForm from '@/components/VarietyForm.vue';
import FeederForm from '@/components/FeederForm.vue';
import FeederList from '@/components/FeederList.vue';
import FeederProductForm from '@/components/FeederProductForm.vue';
import FeederProductList from '@/components/FeedersProductsList.vue';

export default defineComponent({
  name: 'AdminPage',
  components: {
    FeederProductList,
    FeederProductForm,
    FeederList,
    FeederForm,
    VarietyForm,
    BreederForm,
    VarietiesList,
    BreedersList,
  },
  setup() {
    const selectedBreeder = ref<Breeder | null>(null);
    const selectedVariety = ref<Variety | null>(null);
    const selectedFeeder = ref<Feeder | null>(null);
    const selectedFeederProduct = ref<FeederProduct | null>(null);

    function editBreeder(breeder: Breeder): void {
      selectedBreeder.value = breeder;
    }

    function editVariety(variety: Variety): void {
      selectedVariety.value = variety;
    }

    function editFeeder(feeder: Feeder): void {
      selectedFeeder.value = feeder;
    }

    function editFeederProduct(feederProduct: FeederProduct): void {
      selectedFeederProduct.value = feederProduct;
    }

    function cancel() {
      selectedBreeder.value = null;
    }

    return {
      selectedBreeder,
      selectedVariety,
      selectedFeeder,
      selectedFeederProduct,
      editBreeder,
      editVariety,
      editFeeder,
      editFeederProduct,
      cancelBreederSelection: () => { selectedBreeder.value = null; },
      cancelVarietySelection: () => { selectedVariety.value = null; },
      cancelFeederSelection: () => { selectedFeeder.value = null; },
      cancelFeederProductSelection: () => { selectedFeederProduct.value = null; },
      cancel,
    };
  },
});

</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 10px;
  grid-template-areas:
    ". ."
    ". ."
    ". .";
}
</style>
