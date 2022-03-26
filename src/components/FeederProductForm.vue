<template>
  <div class="admin-component feeders-products-form">

    <header class="admin-component__header">
      <h2>{{ edition ? 'Edit' : 'Add'}} feeder product</h2>
      <button class="admin-component__header-options btn btn-danger"
              v-if="edition"
              @click="cancel"> Cancel
      </button>
    </header>

    <form class="vertical-form" @submit.prevent="action"
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

      <label for="breeder-form_picture">
        Feeder
        <select v-model="feeder" id="variety-select">
          <option v-for="optionVariety in feederStore.all"
                  :key="optionVariety._id"
                  :value="optionVariety._id">
            {{optionVariety.title}}
          </option>
        </select>
      </label>

      <button class="btn" type="submit">{{ edition ? 'Edit' : 'New'}}</button>
    </form>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, reactive, toRefs, watch,
} from 'vue';
import { FeederProduct } from '@/types';
import FeederProductStore from '@/store/feeders-products';
import FeederStore from '@/store/feeders';

export default defineComponent({
  name: 'FeederProductForm',

  props: {
    selected: {
      type: Object as PropType<FeederProduct>,
      required: false,
    },
  },

  emits: ['cancel'],

  setup(props, { emit }) {
    const initial = {
      title: '',
      description: null,
      picture: null,
      link: null,
      feeder: null,
    };

    const feederStore = FeederStore();
    const feederProductStore = FeederProductStore();

    const feederProduct = reactive<Partial<FeederProduct>>({
      ...initial,
    });

    watch(() => props.selected, (value) => {
      Object.assign(feederProduct, value || initial);
    });

    function action() {
      const formData = new FormData();
      formData.append('title', feederProduct.title || '');
      formData.append('description', feederProduct.description || '');
      formData.append('picture', feederProduct.picture || '');
      formData.append('link', feederProduct.link || '');
      formData.append('feeder', feederProduct.feeder || '');
      if (props.selected) {
        feederProductStore.edit(feederProduct, formData);
      } else {
        feederProductStore.add(feederProduct, formData);
      }
    }

    return {
      ...toRefs(feederProduct),
      edition: computed(() => !!props.selected),
      cancel: () => emit('cancel'),
      feederStore,
      action,
    };
  },
});
</script>
