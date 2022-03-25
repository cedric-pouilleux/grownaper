<template>
  <div class="admin-component feeders-list">
    <header class="admin-component__header">
      <h2>Feeders</h2>
    </header>
    <ul class="row-list">
      <li class="row-list__item" v-for="feeder in all" :key="feeder._id">
        <img class="rounded" :src="feeder.picture" alt="" width="40" />
        <a v-if="feeder.link" :href="feeder.link">{{feeder.title}}</a>
        <p v-else>{{breeder.title}}</p>
        <div class="row-list__actions">
          <button class="btn" @click="edit(feeder)">Edit</button>
          <button class="btn btn-danger" @click="remove(feeder._id)">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Feeder } from '@/types';
import feederStore from '@/store/feeders';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'FeederList',

  emits: ['edit'],

  setup(params, { emit }) {
    const store = feederStore();
    const { all } = storeToRefs(store);

    const selectedFeeder = ref<Feeder | null>(null);

    return {
      remove: (id: string) => store.remove(id),
      cancel: () => { selectedFeeder.value = null; },
      edit: (feeder: Feeder) => { emit('edit', feeder); },
      all,
      selectedFeeder,
    };
  },

});
</script>
