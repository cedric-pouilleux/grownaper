<template>

  <button v-if="edition" @click="cancel">cancel</button>
  <h2>{{ edition ? 'Edit' : 'Add' }} plant</h2>

  <form @submit.prevent="action" class="plant-form">

    <label class="plant-form__label" for="plant-created-at">
      Created at :
      <input type="date"
             id="plant-created-at"
             :value="inputDateFormat"
             @input="dateChange" />
    </label>

    <label class="plant-form__label" for="plant-name">
      Name :
      <input type="text" id="plant-name" v-model="name" />
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
import moment from 'moment';
import { Plant } from '@/types';
import {
  uniqueNamesGenerator, adjectives, colors, animals, Config,
} from 'unique-names-generator';

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

    const customConfig: Config = {
      dictionaries: [adjectives, colors],
      separator: ' ',
      style: 'capital',
      length: 2,
    };

    const defaultPlant = {
      name: uniqueNamesGenerator(customConfig),
      createdAt: moment().format('YYYY-MM-D'),
      qrcode: '',
      feminized: false,
      automatic: false,
      breeder: undefined,
      variety: undefined,
    };

    const plant = reactive<Partial<Plant>>({
      ...defaultPlant,
    });

    watch(() => props.selected, (value) => {
      Object.assign(plant, value || defaultPlant);
    });

    function dateChange(event: Event) {
      const target = event.target as HTMLInputElement;
      plant.createdAt = target.value;
    }

    function action() {
      if (props.selected) {
        plantStore.edit(plant);
      } else {
        plant.createdAt = moment(plant.createdAt).format();
        plantStore.add(plant);
      }
    }

    return {
      ...toRefs(plant),
      inputDateFormat: computed(() => moment(plant.createdAt).format('YYYY-MM-DD')),
      cancel: () => emit('cancel'),
      edition: computed(() => !!props.selected),
      breeders,
      varieties,
      dateChange,
      action,
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
