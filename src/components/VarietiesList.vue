<template>
  <div class="admin-component varieties-list">
    <h2>Varieties</h2>
    <VarietyForm :selected="selectedVariety" @cancel="cancel"/>
    <ul class="row-list">
      <li class="row-list__item" v-for="variety in varieties.all" :key="variety._id">
        <ul class="inline-tags">
          <li v-if="variety.feminized" class="tag">Feminize</li>
          <li v-if="variety.automatic" class="tag">Automatic</li>
        </ul>
        {{variety.title}}
        <div class="row-list__actions">
          <button class="btn" @click="edit(variety)">Edit</button>
          <button class="btn btn-danger" @click="remove(variety._id)">
            Remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import varietiesStore from '@/store/varieties';
import axios from 'axios';
import VarietyForm from '@/components/VarietyForm.vue';
import { Variety } from '@/types';

export default defineComponent({
  name: 'VarietiesList',

  components: {
    VarietyForm,
  },

  setup() {
    const varieties = varietiesStore();

    const selectedVariety = ref<Variety | null>(null);

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`${process.env.VUE_APP_SERVER_ADDRESS}/variety/delete/${id}`);
        await varieties.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      selectedVariety,
      edit: (variety: Variety) => { selectedVariety.value = variety; },
      remove,
      varieties,
    };
  },

});

</script>

<style lang="scss" scoped>
</style>
