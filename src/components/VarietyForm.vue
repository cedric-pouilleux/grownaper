<template>

  <div class="admin-component">

    <header class="admin-component__header">
      <h2>
        <button v-if="edition" @click="cancel">Cancel</button>
        <template v-if="edition">Edit</template>
        <template v-else>Add</template> variety
      </h2>
    </header>

    <form class="vertical-form" v-on="{ submit: (edition) ? edit : add }">

      <label for="variety-title">
        Title
        <input class="input"
               type="text"
               name="title"
               required
               id="variety-title"
               v-model="title" />
      </label>

      <label for="variety-flowering-time">
        Flowering time
        <input class="input"
               type="number"
               name="floTime"
               id="variety-flowering-time"
               v-model="floTime" />
      </label>

      <button type="submit">{{ edition ? 'Edit' : 'New' }}</button>
    </form>
  </div>

</template>

<script lang="ts">
import {
  defineComponent, watch, computed, PropType, ref, reactive, toRefs,
} from 'vue';
import axios from 'axios';
import VarietyStore from '@/store/varieties';
import BreederStore from '@/store/breeders';
import { Breeder, Variety } from '@/types';

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
    const selectedBreeders = ref<Breeder[]>([]);

    const empty = {
      title: '',
      feminized: false,
      automatic: false,
      floTime: 70,
    };

    const variety = reactive<Partial<Variety>>({
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
      selectedBreeders,
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
