<template>
  <h2>Varieties list</h2>
  <VarietyForm :variety="selectedVariety" @cancel="cancel"/>
  <ul class="row-list">
    <li v-for="variety in varieties.all" :key="variety._id">
      {{variety.slug}}
      <button class="btn" @click="edit(variety)">Edit</button>
      <button class="btn btn-danger" @click="remove(variety._id)">
        Remove
      </button>
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
    const varieties = varietiesStore();

    const selectedVariety = ref<Variety | null>(null);

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`${process.env.VUE_APP_SERVER_ADDRESS}/variety/delete/${id}`);
        await varieties.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      selectedVariety,
      edit: (variety: Variety) => { selectedVariety.value = variety; },
      cancel: () => { selectedVariety.value = null; },
      remove,
      varieties,
    };
  },

});

</script>

<style>
</style>
