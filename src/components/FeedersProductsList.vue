<template>
  <div class="feeders-products-list">
    <h2>Feeders products list</h2>
    <ul>
      <li v-for="feederProduct in all" :key="feederProduct._id" :data-id="feederProduct._id">
        {{feederProduct.title}}
        <button class="btn" @click="edit(feederProduct)">Edit</button>
        <button class="btn" @click="remove(feederProduct._id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { FeederProduct } from '@/types';
import feederProductStore from '@/store/feeders-products';

export default defineComponent({
  name: 'FeederProductList',
  emits: ['edit'],
  setup(props, { emit }) {
    const store = feederProductStore();
    const { all } = storeToRefs(store);

    const selectedFeederProduct = ref<FeederProduct | null>(null);

    return {
      selectedFeederProduct,
      all,
      remove: (id: string) => store.remove(id),
      edit: (feederProduct: FeederProduct) => { emit('edit', feederProduct); },
      cancel: () => { selectedFeederProduct.value = null; },
    };
  },
});
</script>
