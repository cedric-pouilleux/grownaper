<template>
  <h2>Varieties list</h2>
  <ul>
    <li v-for="variety in store.all" :key="variety._id">
      {{variety.title}}
      <button @click="remove(variety._id)">Remove</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import varietiesStore from '@/store/varieties';
import axios from 'axios';

export default defineComponent({
  name: 'VarietiesList',

  setup() {
    const store = varietiesStore();
    store.fetch();

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`https://grownaper.herokuapp.com/variety/delete/${id}`);
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
