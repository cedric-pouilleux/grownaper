<template>
  <h2>Varieties list</h2>
  <VarietyForm :id="selectedVarietyId" :title="selectedVarietyTitle"/>
  <ul class="row-list">
    <li v-for="variety in store.all" :key="variety._id">
      {{variety.title}}
      <button class="btn" @click="edit(variety)">Edit</button>
      <button class="btn btn-danger" @click="remove(variety._id)">Remove</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import varietiesStore from '@/store/varieties';
import axios from 'axios';
import VarietyForm from '@/components/VarietyForm.vue';
import { Variety } from '@/types';

export default defineComponent({
  name: 'VarietiesList',

  components: {
    VarietyForm,
  },

  setup() {
    const store = varietiesStore();
    store.fetch();

    const selectedVarietyTitle = ref<string | null>(null);
    const selectedVarietyId = ref<string | null>(null);

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`https://grownaper.herokuapp.com/variety/delete/${id}`);
        // add visual action for delete success
        await store.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    async function edit(variety: Variety) {
      selectedVarietyTitle.value = variety.title;
      selectedVarietyId.value = variety._id;
      /*
      try {
        await axios.put(`https://grownaper.herokuapp.com/variety/edit/${variety._id}`);
        await store.fetch();
      } catch (err) {
        console.log(err);
      } */
    }

    return {
      remove,
      edit,
      store,
      selectedVarietyTitle,
      selectedVarietyId,
    };
  },

});

</script>

<style>
</style>
