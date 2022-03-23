<template>
  <div class="admin-component breeders-form">

    <header class="admin-component__header">
      <h2>{{ edition ? 'Edit' : 'Add'}} breeder</h2>
      <button class="admin-component__header-options btn btn-danger"
              v-if="edition"
              @click="cancel"> Cancel
      </button>
    </header>

    <form class="vertical-form"
          v-on="{ submit: (edition) ? edit : add }"
          enctype="multipart/form-data">

      <label for="breederForm_title">
        Title
        <input type="text"
               required
               class="input"
               name="title"
               id="breederForm_title"
               v-model="title" />
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

      <label for="breeder-form_picture">
        Picture
        <input type="file"
               class="input"
               name="picture"
               id="breeder-form_picture"
               @change="change" />
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

    const initialBreeder = {
      link: '',
      picture: undefined,
      title: '',
      country: '',
    };

    const breeder = reactive<Breeder>({
      ...initialBreeder,
    });

    watch(() => props.selected, (value) => {
      Object.assign(breeder, value || initialBreeder);
    });

    async function add(e: Event) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', breeder.title);
      formData.append('country', breeder.country || '');
      formData.append('picture', breeder.picture || '');
      formData.append('link', breeder.link || '');
      try {
        await axios.post(`${process.env.VUE_APP_SERVER_ADDRESS}/breeder/add`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        await breederStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    async function edit(e: Event) {
      e.preventDefault();
      if (!breeder._id) {
        throw new Error('Breeder id is required');
      }
      const formData = new FormData();
      formData.append('_id', breeder._id || '');
      formData.append('title', breeder.title);
      formData.append('country', breeder.country || '');
      formData.append('picture', breeder.picture || '');
      formData.append('link', breeder.link || '');
      try {
        await axios.put(`${process.env.VUE_APP_SERVER_ADDRESS}/breeder/edit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        await breederStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    function change(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target?.files?.length) {
        const file = target.files[0];
        breeder.picture = file;
      }
    }

    return {
      ...toRefs(breeder),
      edition: computed(() => !!props.selected),
      cancel: () => emit('cancel'),
      add,
      edit,
      change,
    };
  },
});
</script>
