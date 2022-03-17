<template>
  <form v-on="{ submit: (editMode) ? edit : add }">
    <h2>
      <template v-if="editMode">
        Edit plant <button @click="switchToAdd">cancel</button>
      </template>
      <template v-else>Add plant</template>
    </h2>
    <label for="breeder-select">
      Breeder :
      <select v-model="selectedBreederId" id="breeder-select">
        <option v-for="breeder in breederStore.all" :key="breeder._id" :value="breeder._id">
          {{breeder.title}}
        </option>
      </select>
    </label>
    <label for="variety-select">
      Variety :
      <select v-model="selectedVarietyId" id="variety-select">
        <option v-for="variety in varietyStore.all" :key="variety._id" :value="variety._id">
          {{variety.title}}
        </option>
      </select>
    </label>
    <button type="submit">{{ editMode ? 'Edit' : 'Submit' }}</button>
  </form>
</template>

<script lang="ts">
import {
  defineComponent, watch, computed, ref,
} from 'vue';
import BreederStore from '@/store/breeders';
import VarietyStore from '@/store/varieties';
import PlantStore from '@/store/plants';
import axios from 'axios';

export default defineComponent({
  name: 'PlantForm',

  props: {
    id: { type: String, required: false },
    variety: { type: String, default: '' },
    breeder: { type: String, default: '' },
  },

  setup(props, { emit }) {
    const plantStore = PlantStore();
    const breederStore = BreederStore();
    const varietyStore = VarietyStore();
    const selectedBreederId = ref<string | null>(null);
    const selectedVarietyId = ref<string | null>(null);
    const editMode = computed(() => Boolean(props.id));

    async function add(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.post('https://grownaper.herokuapp.com/plant/add', {
          createdAt: new Date(),
          qrcode: String,
          breeder: selectedBreederId.value,
          variety: selectedVarietyId.value,
        });
        await plantStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    async function edit(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.post('https://grownaper.herokuapp.com/plant/edit', {
          id: props.id,
          variety: props.variety,
          breeder: props.breeder,
        });
        await plantStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    function switchToAdd() {
      emit('addMode');
    }

    watch(() => props.id, (newVal) => {
      selectedVarietyId.value = props.variety;
      selectedBreederId.value = props.breeder;
    });

    return {
      breederStore,
      varietyStore,
      selectedBreederId,
      selectedVarietyId,
      editMode,
      add,
      edit,
      switchToAdd,
    };
  },

});

</script>

<style>
</style>
