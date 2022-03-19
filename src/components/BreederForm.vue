<template>
  <div class="admin-component breeders-form">
    <header class="admin-component__header">
      <h2>{{ edition ? 'Edit' : 'Add'}} breeder</h2>
      <button class="admin-component__header-options btn btn-danger"
              v-if="edition"
              @click="cancel"> Cancel
      </button>
    </header>
    <form class="vertical-form" v-on="{ submit: (edition) ? edit : add }">
      <label for="breederForm_title">
        Title
        <input type="text"
               class="input"
               name="title"
               id="breederForm_title"
               v-model="title" />
      </label>

      <label for="breederForm_picture">
        Picture
        <input type="text"
               class="input"
               name="picture"
               id="breederForm_picture"
               v-model="picture" />
      </label>

      <label for="breederForm_link">
        Link
        <input type="text"
               class="input"
               name="link"
               id="breederForm_link"
               v-model="link" />
      </label>

      <label for="breederForm_country">
        Country
        <input type="text"
               class="input"
               name="country"
               id="breederForm_country"
               v-model="country" />
      </label>

      <button class="btn" type="submit">{{ edition ? 'Edit' : 'New'}}</button>
    </form>
  </div>
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
