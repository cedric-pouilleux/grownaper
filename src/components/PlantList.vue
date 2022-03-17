<template>
  <div class="plants-list">
    <h2>Plants list</h2>
    <PlantForm :id="selectedPlantId"
               :variety="selectedPlantVariety"
               :breeder="selectedPlantBreeder"
               @addMode="setToAddMode"/>
    <ul>
      <li v-for="plant in store.all" :key="plant._id">
        <div class="plants-list__createdAt">{{ readableDate(plant.createdAt) }}</div>
        <p>Breeder : {{ plant.breeder.title }}</p>
        <p>Variety : {{ plant.variety.title }}</p>
        <qrcode-vue :value="plant.qrcode" :size="140" level="H" />
        <button @click="edit(plant)">Edit</button>
        <button @click="remove(plant._id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlantForm from '@/components/PlantForm.vue';
import plantStore from '@/store/plants';
import QrcodeVue from 'qrcode.vue';
import { Plant, Variety, Breeder } from '@/types';
import axios from 'axios';
import moment from 'moment';

export default defineComponent({
  name: 'PlantList',

  components: {
    QrcodeVue,
    PlantForm,
  },

  setup() {
    const store = plantStore();
    store.fetch();

    const selectedPlantId = ref<string | null>(null);
    const selectedPlantVariety = ref<string | null>(null);
    const selectedPlantBreeder = ref<string | null>(null);

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`https://grownaper.herokuapp.com/plant/delete/${id}`);
        // add visual action for delete success
        await store.fetch();
      } catch (err) {
        console.log(err);
      }
    }

    function edit(plant: Plant) {
      selectedPlantId.value = plant._id;
      selectedPlantVariety.value = plant.variety._id;
      selectedPlantBreeder.value = plant.breeder._id;
    }

    function readableDate(date: Date): string {
      return moment(date).format('MMMM Do YYYY');
    }

    function setToAddMode() {
      selectedPlantId.value = null;
      selectedPlantVariety.value = null;
      selectedPlantBreeder.value = null;
    }

    return {
      remove,
      edit,
      readableDate,
      store,
      selectedPlantId,
      selectedPlantBreeder,
      selectedPlantVariety,
      setToAddMode,
    };
  },

});

</script>

<style lang="scss">

  .plants-list {

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      column-gap: 20px;

      li {
        border: 1px solid #ebebeb;
        display: flex;
        font-size: .9em;
        justify-content: end;
        align-content: center;
        flex-direction: column;
        padding: 10px;
        max-width: 140px;

        canvas {
          margin-bottom: 10px;
        }
      }
    }
  }

</style>
