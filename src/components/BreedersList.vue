<template>
  <h2>Breeders list</h2>
  <ul>
    <li v-for="breeder in breeders" :key="breeder.id">
      {{breeder.title}} - {{breeder.picture}} - {{breeder.link}}
      <button @click="remove(breeder._id)">Remove</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'BreedersList',
  setup() {
    const breeders = ref(null);

    async function getAll(): Promise<void> {
      const result = await axios.get('https://grownaper.herokuapp.com/breeders');
      if (result.data) {
        breeders.value = result.data;
      }
    }

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`https://grownaper.herokuapp.com/breeders/delete/${id}`);
        // add visual action for delete success
        await getAll();
      } catch (err) {
        console.log(err);
      }
    }

    getAll();

    return {
      breeders,
      remove,
    };
  },
});
</script>
