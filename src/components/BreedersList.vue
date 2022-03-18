<template>
  <h2>Breeders list</h2>
  <BreederForm/>
  <ul>
    <li v-for="breeder in store.all" :key="breeder._id">
      {{breeder.title}} - {{breeder.picture}} - {{breeder.link}}
      <button @click="remove(breeder._id)">Remove</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import breederStore from '@/store/breeders';
import BreederForm from '@/components/BreederForm.vue';
import axios from 'axios';

export default defineComponent({
  name: 'BreedersList',

  components: {
    BreederForm,
  },

  setup() {
    const store = breederStore();
    store.fetch();

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`https://grownaper.herokuapp.com/breeders/delete/${id}`);
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
