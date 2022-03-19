<template>

  <button v-if="edition" @click="cancel">cancel</button>
  <h2>{{ edition ? 'Edit' : 'Add' }} plant</h2>

  <form v-on="{ submit: (edition) ? edit : add }" class="plant-form">

    <label class="plant-form__label" for="plant-created-at">
      Created at :
      <input type="date" id="plant-created-at" v-model="createdAt">
    </label>

    <label class="plant-form__label" for="plant-name">
      Name :
      <input type="text" id="plant-name" v-model="name">
    </label>

    <label class="plant-form__label" for="breeder-select">
      Breeder :
      <select v-model="breeder" id="breeder-select">
        <option v-for="optionBreeder in breeders.all"
                :key="optionBreeder._id"
                :value="optionBreeder">
          {{optionBreeder.title}}
        </option>
      </select>
    </label>

    <label class="plant-form__label" for="variety-select">
      Variety :
      <select v-model="variety" id="variety-select">
        <option v-for="optionVariety in varieties.all"
                :key="optionVariety._id"
                :value="optionVariety">
          {{optionVariety.title}}
        </option>
      </select>
    </label>

    <button type="submit">{{ edition ? 'Edit' : 'New' }}</button>
  </form>

</template>

<script lang="ts">
import {
  defineComponent, watch, computed, PropType, reactive, toRefs,
} from 'vue';
import BreederStore from '@/store/breeders';
import VarietyStore from '@/store/varieties';
import PlantStore from '@/store/plants';
import axios from 'axios';
import moment from 'moment';
import { Plant } from '@/types';

export default defineComponent({
  name: 'PlantForm',

  emits: ['cancel'],

  props: {
    selected: {
      type: Object as PropType<Plant>,
      required: false,
    },
  },

  setup(props, { emit }) {
    const plantStore = PlantStore();
    const breeders = BreederStore();
    const varieties = VarietyStore();

    const plant = reactive<Plant>({
      name: '',
      createdAt: moment().format('YYYY-MM-D'),
      qrcode: '',
      breeder: undefined,
      variety: undefined,
    });

    async function add(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.post('https://grownaper.herokuapp.com/plant/add', plant);
        await plantStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    async function edit(e: Event) : Promise<void> {
      e.preventDefault();
      try {
        await axios.put('https://grownaper.herokuapp.com/plant/edit', plant);
        await plantStore.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    watch(() => props.selected, (value) => {
      console.log(value);
      Object.assign(plant, value || {
        name: '',
        createdAt: moment().format('YYYY-MM-D'),
        qrcode: '',
        breeder: undefined,
        variety: undefined,
      });
    });

    return {
      ...toRefs(plant),
      breeders,
      varieties,
      edition: computed(() => !!props.selected),
      add,
      edit,
      cancel: () => emit('cancel'),
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
