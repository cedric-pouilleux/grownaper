<template>
  <div class="plants-list">
    <h2>Plants list</h2>
    <PlantForm :selected="selectedPlant" @cancel="cancel"/>
    <ul>
      <li v-for="plant in plants.all" :key="plant._id">
        <header>
          <h3 v-if="plant.name">{{ plant.name }}</h3>
          <p>{{ (plant.variety) ? plant.variety.title : 'No variety, select one' }}</p>
          <p>{{ (plant.breeder) ? plant.breeder.title : 'No breeder, select one' }}</p>
          <div class="plants-list__createdAt">{{ readableDate(plant.createdAt) }}</div>
        </header>
        <qrcode-vue :value="plant.qrcode" :size="140" level="H" />
        <button class="btn"
                :class="{ 'btn-warning' : requiredAction(plant) }"
                @click="edit(plant)">
          Edit
        </button>
        <button class="btn" @click="remove(plant._id)">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import PlantForm from '@/components/PlantForm.vue';
import plantStore from '@/store/plants';
import QrcodeVue from 'qrcode.vue';
import { Breeder, Plant, Variety } from '@/types';
import axios from 'axios';
import moment from 'moment';

export default defineComponent({
  name: 'PlantList',

  components: {
    QrcodeVue,
    PlantForm,
  },

  setup() {
    const plants = plantStore();

    const selectedPlant = ref<Plant | null>(null);

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`https://grownaper.herokuapp.com/plant/delete/${id}`);
        await plants.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      remove,
      selectedPlant,
      plants,
      edit: (plant: Plant) => { selectedPlant.value = plant; },
      cancel: () => { selectedPlant.value = null; },
      readableDate: (date: Date | string): string => moment(date).format('YYYY-MM-DD'),
      requiredAction: (plant: Plant): boolean => !(plant.breeder && plant.variety),
      moment,
    };
  },

});

</script>

<style lang="scss">

  .plants-list {

    &__createdAt   {
      margin-top: 6px;
      font-size: .8em;
      font-weight: 700;
    }

    header {
      padding: 12px;
    }

    p {
      margin: 0;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;

      li {
        border: 1px solid #ebebeb;
        margin: 4px;
        display: flex;
        font-size: .9em;
        align-content: center;
        flex-direction: column;
        justify-content: end;
        padding: 10px;
        max-width: 140px;

        canvas {
          margin-bottom: 10px;
        }
      }
    }
  }

</style>
