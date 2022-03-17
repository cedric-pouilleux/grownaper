<template>
  <h2>add variety</h2>
  <form @submit="add">
    <label for="variety-title">
      <input type="text" id="variety-title" v-model="varietyTitle" />
    </label>
    <button>add</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import varietyStore from '@/store/varieties';

export default defineComponent({
  name: 'VarietyForm',

  setup() {
    const varietyTitle = ref('');

    async function add(e: Event) {
      e.preventDefault();
      try {
        await axios.post('https://grownaper.herokuapp.com/variety/add', {
          title: varietyTitle.value,
        });
        await varietyStore().fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      add,
      varietyTitle,
    };
  },

});

</script>

<style>
</style>
