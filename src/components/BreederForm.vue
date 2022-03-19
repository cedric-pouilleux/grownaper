<template>
  <button v-if="edition" @click="cancel">Cancel</button>
  <h2>{{ edition ? 'Edit' : 'Add'}} breeder</h2>
  <form class="vertical-form" v-on="{ submit: (edition) ? edit : add }">
      <label for="breederForm_title">
          Title
          <input type="text"
                 name="title"
                 id="breederForm_title"
                 v-model="title" />
      </label>

      <label for="breederForm_picture">
          Picture
          <input type="text"
                 name="picture"
                 id="breederForm_picture"
                 v-model="picture" />
      </label>

      <label for="breederForm_link">
          Link
          <input type="text"
                 name="link"
                 id="breederForm_link"
                 v-model="link" />
      </label>

      <label for="breederForm_country">
          Country
          <input type="text"
                 name="country"
                 id="breederForm_country"
                 v-model="country" />
      </label>

      <button type="submit">{{ edition ? 'Edit' : 'New'}}</button>
  </form>
</template>

<script lang="ts">
import {
  defineComponent, PropType, toRefs, reactive, computed, watch,
} from 'vue';
import axios from 'axios';
import BreederStore from '@/store/breeders';
import { Breeder } from '@/types';

export default defineComponent({
  name: 'BreederForm',

  props: {
    selected: {
      type: Object as PropType<Breeder>,
      required: false,
    },
  },

  emits: ['cancel'],

  setup(props, { emit }) {
    const breederStore = BreederStore();

    const breeder = reactive<Breeder>({
      link: '',
      picture: '',
      title: '',
      country: '',
    });

    watch(() => props.selected, (value) => {
      Object.assign(breeder, value || {
        link: '',
        picture: '',
        title: '',
        country: '',
      });
    });

    async function add(e: Event) {
      e.preventDefault();
      try {
        await axios.post(`${process.env.VUE_APP_SERVER_ADDRESS}/breeder/add`, breeder);
        await breederStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    async function edit(e: Event) {
      e.preventDefault();
      try {
        await axios.put(`${process.env.VUE_APP_SERVER_ADDRESS}/breeder/edit`, breeder);
        await breederStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      ...toRefs(breeder),
      edition: computed(() => !!props.selected),
      cancel: () => emit('cancel'),
      add,
      edit,
    };
  },
});
</script>
