<template>
  <div class="admin-component breeders-list">
    <header class="admin-component__header">
      <h2>Breeders</h2>
    </header>
    <ul class="row-list">
      <li class="row-list__item" v-for="breeder in breeders.all" :key="breeder._id">
        <img class="rounded" :src="breeder.picture" alt="" width="40" />
        <a v-if="breeder.link" :href="breeder.link">{{breeder.title}}</a>
        <p v-else>{{breeder.title}}</p>
        <div class="row-list__actions">
          <button class="btn" @click="edit(breeder)">Edit</button>
          <button class="btn btn-danger" @click="remove(breeder._id)">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import breederStore from '@/store/breeders';
import axios from 'axios';
import { Breeder } from '@/types';

export default defineComponent({
  name: 'BreedersList',

  emits: ['edit'],

  setup(params, { emit }) {
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
      edit: (breeder: Breeder) => { emit('edit', breeder); },
      breeders,
      selectedBreeder,
    };
  },
});
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 100%;
  border:1px solid #000;
}
</style>
