<template>

  <h2>
    <button v-if="edition" @click="cancel">Cancel</button>
    <template v-if="edition">Edit</template>
    <template v-else>Add</template> variety
  </h2>

  <form v-on="{ submit: (edition) ? edit : add }">

    <label for="variety-title">
      <input type="text"
             required
             id="variety-title"
             v-model="title" />
    </label>

    <label for="variety-feminized">
      Feminized
      <input type="checkbox"
             id="variety-feminized"
             v-model="feminized" />
    </label>

    <label for="variety-automatic">
      Automatic
      <input type="checkbox"
             id="variety-automatic"
             v-model="automatic" />
    </label>

    <button type="submit">{{ edition ? 'Edit' : 'New' }}</button>
  </form>

</template>

<script lang="ts">
import {
  defineComponent, watch, computed, PropType, reactive, toRefs,
} from 'vue';
import axios from 'axios';
import VarietyStore from '@/store/varieties';
import { Variety } from '@/types';

export default defineComponent({
  name: 'VarietyForm',

  props: {
    selected: {
      type: Object as PropType<Variety>,
      required: false,
    },
  },

  emits: ['cancel'],

  setup(props, { emit }) {
    const varietyStore = VarietyStore();

    const empty = {
      title: '',
      slug: '',
      breeder: [],
      feminized: false,
      automatic: false,
    };

    const variety = reactive<Variety>({
      ...empty,
    });

    watch(() => props.selected, (value) => {
      Object.assign(variety, value || empty);
    });

    async function add(e: Event) {
      e.preventDefault();
      try {
        await axios.post(`${process.env.VUE_APP_SERVER_ADDRESS}/variety/add`, variety);
        await varietyStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    async function edit(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.put(`${process.env.VUE_APP_SERVER_ADDRESS}/variety/edit`, variety);
        await varietyStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      ...toRefs(variety),
      edition: computed(() => !!props.selected),
      cancel: () => emit('cancel'),
      add,
      edit,
    };
  },

});

</script>

<style>
</style>
