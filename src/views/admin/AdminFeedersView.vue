<template>
  <feeder-form :selected="selectedFeeder"
               :opened="formFeederOpened"
               @close="closeFeederForm"/>
  <feeder-product-form :selected="selectedFeederProduct"
               :opened="formFeederProductOpened"
               @close="closeFeederProductForm"/>
  <admin-ui-navigation/>
  <el-container>
    <el-aside width="600px">
      <el-main>
        <feeder-list @edit="editFeeder" @add="addFeeder"/>
      </el-main>
    </el-aside>
    <el-main>
      <feeder-product-list @edit="editFeederProduct" @add="addFeederProduct"/>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FeederList from '@/components/FeederList.vue';
import FeederProductList from '@/components/FeedersProductsList.vue';
import { Feeder, FeederProduct } from '@/types';
import FeederProductForm from '@/components/FeederProductForm.vue';
import FeederForm from '@/components/FeederForm.vue';
import AdminUiNavigation from '@/components/admin/ui/Navigation.vue';

export default defineComponent({
  name: 'AdminFeedersView',
  components: {
    AdminUiNavigation,
    FeederForm,
    FeederProductForm,
    FeederProductList,
    FeederList,
  },
  setup() {
    const formFeederOpened = ref<boolean>(false);
    const formFeederProductOpened = ref<boolean>(false);
    const selectedFeeder = ref<Feeder | null>(null);
    const selectedFeederProduct = ref<FeederProduct | null>(null);

    function addFeeder() {
      formFeederOpened.value = true;
    }

    function editFeeder(feeder: Feeder) {
      formFeederOpened.value = true;
      selectedFeeder.value = feeder;
    }

    function addFeederProduct() {
      formFeederProductOpened.value = true;
    }

    function editFeederProduct(feederProduct: FeederProduct) {
      formFeederProductOpened.value = true;
      selectedFeederProduct.value = feederProduct;
    }

    function closeFeederProductForm() {
      selectedFeederProduct.value = null;
      formFeederProductOpened.value = false;
    }

    function closeFeederForm() {
      selectedFeeder.value = null;
      formFeederOpened.value = false;
    }

    return {
      addFeeder,
      editFeeder,
      addFeederProduct,
      editFeederProduct,
      formFeederProductOpened,
      formFeederOpened,
      selectedFeeder,
      selectedFeederProduct,
      closeFeederProductForm,
      closeFeederForm,
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
