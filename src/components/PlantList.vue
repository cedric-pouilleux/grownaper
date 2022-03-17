<template>
  <h2>Plants list</h2>
  <ul>
    <li v-for="plant in store.all" :key="plant._id">
      {{plant.breeder}} - {{plant.variety}}
      <button @click="remove(plant._id)">Remove</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import plantStore from '@/store/plants';
import axios from 'axios';

export default defineComponent({
  name: 'PlantList',

  setup() {
    const store = plantStore();
    store.fetch();

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`https://grownaper.herokuapp.com/plant/delete/${id}`);
        // add visual action for delete success
        await store.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      remove,
      store,
    };
  },

});

</script>

<style>
</style>
