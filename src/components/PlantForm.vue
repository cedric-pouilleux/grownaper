<template>
  <form v-on="{ submit: (editMode) ? edit : add }" class="plant-form">
    <button v-if="editMode" @click="switchToAdd">cancel</button>
    <h2>
      <template v-if="editMode">Edit plant</template>
      <template v-else>Add plant</template>
    </h2>
    <label class="plant-form__label" for="plant-created-at">
      Created at : <input type="date" id="plant-created-at" v-model="selectedCreatedAt">
    </label>
    <label class="plant-form__label" for="breeder-select">
      Breeder :
      <select v-model="selectedBreederId" id="breeder-select">
        <option v-for="breeder in breederStore.all" :key="breeder._id" :value="breeder._id">
          {{breeder.title}}
        </option>
      </select>
    </label>
    <label class="plant-form__label" for="variety-select">
      Variety :
      <select v-model="selectedVarietyId" id="variety-select">
        <option v-for="variety in varietyStore.all" :key="variety._id" :value="variety._id">
          {{variety.title}}
        </option>
      </select>
    </label>
    <button type="submit">{{ editMode ? 'Edit' : 'New' }}</button>
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
import moment from 'moment';

export default defineComponent({
  name: 'PlantForm',

  props: {
    id: { type: String, required: false },
    variety: { type: String, default: '' },
    breeder: { type: String, default: '' },
    createdAt: { type: String, default: '' },
  },

  setup(props, { emit }) {
    const plantStore = PlantStore();
    const breederStore = BreederStore();
    const varietyStore = VarietyStore();

    varietyStore.fetch();
    breederStore.fetch();

    const selectedBreederId = ref<string | null>(null);
    const selectedVarietyId = ref<string | null>(null);
    const selectedCreatedAt = ref<string | null>(moment().format('YYYY-MM-D'));

    const editMode = computed(() => Boolean(props.id));

    async function add(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.post('https://grownaper.herokuapp.com/plant/add', {
          createdAt: selectedCreatedAt.value,
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
      console.log(props.variety, selectedVarietyId.value);
      try {
        await axios.put('https://grownaper.herokuapp.com/plant/edit', {
          id: props.id,
          createdAt: selectedCreatedAt.value,
          variety: selectedVarietyId.value,
          breeder: selectedBreederId.value,
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
      selectedCreatedAt.value = props.createdAt;
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
      selectedCreatedAt,
    };
  },

});

</script>

<style lang="scss">

.plant-form {
  background-color: #ebebeb;
  padding: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    height: 30px;
    margin-left: 12px;
  }
  &__label {
    font-size: .9em;
    padding: 0 6px;
    input, select {
      height: 30px;
    }
    select {
      display: table-row;
    }
  }
}

</style>
