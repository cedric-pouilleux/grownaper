<template>
  <div class="breeders-list">
    <h2>Breeders list</h2>
    <BreederForm :selected="selectedBreeder" @cancel="cancel"/>
    <ul class="row-list">
      <li v-for="breeder in breeders.all" :key="breeder._id">
        {{breeder.title}} - {{breeder.picture}} - {{breeder.link}}
        <button class="btn" @click="edit(breeder)">Edit</button>
        <button class="btn btn-danger" @click="remove(breeder._id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import breederStore from '@/store/breeders';
import BreederForm from '@/components/BreederForm.vue';
import axios from 'axios';
import { Breeder } from '@/types';

export default defineComponent({
  name: 'BreedersList',

  components: {
    BreederForm,
  },

  setup() {
    const breeders = breederStore();

    const selectedBreeder = ref<Breeder | null>(null);

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`${process.env.VUE_APP_SERVER_ADDRESS}/breeder/delete/${id}`);
        // add visual action for delete success
        await breeders.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      remove,
      cancel: () => { selectedBreeder.value = null; },
      edit: (breeder: Breeder) => { selectedBreeder.value = breeder; },
      breeders,
      selectedBreeder,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
