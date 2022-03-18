<template>
  <h2>
    <button v-if="edition" @click="cancel">Cancel</button>
    <template v-if="edition">Edit</template>
    <template v-else>Add</template> variety
  </h2>
  <form v-on="{ submit: (edition) ? edit : add }">
    <label for="variety-title">
      <input type="text" id="variety-title" v-model="varietyTitle" />
    </label>
    <button type="submit">{{ edition ? 'Edit' : 'New' }}</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import axios from 'axios';
import VarietyStore from '@/store/varieties';

export default defineComponent({
  name: 'VarietyForm',

  props: {
    id: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const varietyTitle = ref<string | null>(null);
    const edition = ref<boolean>(false);
    const varietyStore = VarietyStore();

    watch(() => props.id, (value) => {
      edition.value = !!value;
      varietyTitle.value = props.title;
    });

    async function add(e: Event) {
      e.preventDefault();
      try {
        await axios.post('https://grownaper.herokuapp.com/variety/add', {
          title: varietyTitle.value,
        });
        await varietyStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    async function edit(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.put('https://grownaper.herokuapp.com/variety/edit', {
          _id: props.id,
          title: varietyTitle.value,
        });
        await varietyStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    function cancel() {
      edition.value = false;
      varietyTitle.value = null;
    }

    return {
      add,
      edit,
      varietyTitle,
      edition,
      cancel,
    };
  },

});

</script>

<style>
</style>
