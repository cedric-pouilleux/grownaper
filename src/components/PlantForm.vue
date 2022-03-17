<template>
  <form @submit="add">
    <h2>Add plant</h2>
    <label for="breeder-select">
      Breeder :
      <select v-model="selectedBreederId" id="breeder-select">
        <option v-for="breeder in breederStore.all" :key="breeder._id" :value="breeder._id">
          {{breeder.title}}
        </option>
      </select>
    </label>
    <label for="variety-select">
      Variety :
      <select v-model="selectedVarietyId" id="variety-select">
        <option v-for="variety in varietyStore.all" :key="variety._id" :value="variety._id">
          {{variety.title}}
        </option>
      </select>
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BreederStore from '@/store/breeders';
import VarietyStore from '@/store/varieties';
import PlantStore from '@/store/plants';
import axios from 'axios';

export default defineComponent({
  name: 'PlantForm',

  setup() {
    const plantStore = PlantStore();
    const breederStore = BreederStore();
    const varietyStore = VarietyStore();
    const selectedBreederId = ref<string | null>(null);
    const selectedVarietyId = ref<string | null>(null);

    async function add(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.post('https://grownaper.herokuapp.com/plant/add', {
          createdAt: new Date(),
          qrcode: String,
          breeder: selectedBreederId.value,
          variety: selectedVarietyId.value,
        });
        await plantStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      breederStore,
      varietyStore,
      selectedBreederId,
      selectedVarietyId,
      add,
    };
  },

});

</script>

<style>
</style>
