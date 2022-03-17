<template>
  <label for="plant-form-select">
    Breeder :
    <select v-model="selectedBreederId" id="plant-form-select">
      <option v-for="breeder in store.all" :key="breeder._id" :value="breeder._id">
        {{breeder.title}}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BreederStore from '@/store/breeders';

export default defineComponent({
  name: 'PlantForm',

  setup() {
    const store = BreederStore();
    const selectedBreederId = ref<string | null>(null);
    return {
      store,
      selectedBreederId,
    };
  },

});

</script>

<style>
</style>
