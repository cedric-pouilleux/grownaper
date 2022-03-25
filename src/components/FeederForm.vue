<template>
  <div class="admin-component feeders-form">

    <header class="admin-component__header">
      <h2>{{ edition ? 'Edit' : 'Add'}} feeder</h2>
      <button class="admin-component__header-options btn btn-danger"
              v-if="edition"
              @click="cancel"> Cancel
      </button>
    </header>

    <form class="vertical-form"
          v-on="{ submit: (edition) ? edit : add }"
          enctype="multipart/form-data">

      <label for="feederForm_title">
        Title
        <input type="text"
               required
               class="input"
               name="title"
               id="feederForm_title"
               v-model="title" />
      </label>

      <label for="feederForm_link">
        Link
        <input type="text"
               class="input"
               name="link"
               id="feederForm_link"
               v-model="link" />
      </label>

      <label for="feederForm_link">
        Description
        <input type="text"
               class="input"
               name="description"
               id="feederForm_description"
               v-model="description" />
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
  computed, defineComponent, PropType, reactive, toRefs, watch,
} from 'vue';
import FeederStore from '@/store/feeders';
import { Feeder } from '@/types';

export default defineComponent({
  name: 'FeederForm',

  props: {
    selected: {
      type: Object as PropType<Feeder>,
      required: false,
    },
  },

  setup(props, { emit }) {
    const feederStore = FeederStore();

    const initialFeeder = {
      title: '',
      picture: undefined,
      description: '',
      link: '',
    };

    const feeder = reactive<Partial<Feeder>>({
      ...initialFeeder,
    });

    watch(() => props.selected, (value) => {
      Object.assign(feeder, value || initialFeeder);
    });

    async function add(e: Event) {
      e.preventDefault();
      feederStore.add(feeder);
    }

    function change(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target?.files?.length) {
        const file = target.files[0];
        feeder.picture = file;
      }
    }

    function edit(e: Event) {
      e.preventDefault();
      feederStore.edit(feeder);
    }

    return {
      ...toRefs(feeder),
      edition: computed(() => !!props.selected),
      cancel: () => emit('cancel'),
      add,
      edit,
      change,
    };
  },
});
</script>
