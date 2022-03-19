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
    variety: {
      type: Object as PropType<Variety>,
      required: false,
    },
  },

  emit: ['cancel'],

  setup(props, { emit }) {
    const varietyStore = VarietyStore();

    const variety = reactive<Variety>({
      title: '',
      feminized: false,
      automatic: false,
    });

    watch(() => props.variety, (value) => {
      Object.assign(variety, value || {
        title: '',
      });
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
      edition: computed(() => !!props.variety),
      cancel: () => emit('cancel'),
      add,
      edit,
    };
  },

});

</script>

<style>
</style>
