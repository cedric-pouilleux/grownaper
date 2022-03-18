<template>
  <div class="plants-list">
    <h2>Plants list</h2>
    <PlantForm :id="selectedPlantId"
               :variety="selectedPlantVariety"
               :breeder="selectedPlantBreeder"
               :createdAt="selectedCreatedAt"
               @addMode="setToAddMode"/>
    <ul>
      <li v-for="plant in store.all" :key="plant._id">
        <header>
          <p v-if="plant.breeder">{{ plant.breeder.title }}</p>
          <p v-if="plant.variety">{{ plant.variety.title }}</p>
          <div class="plants-list__createdAt">{{ readableDate(plant.createdAt) }}</div>
        </header>
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
    const selectedCreatedAt = ref<string | null>(null);
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
      selectedCreatedAt.value = moment(plant.createdAt).format('YYYY-MM-DD');
    }

    function readableDate(date: Date | string): string {
      return moment(date).format('YYYY-MM-DD');
    }

    function setToAddMode() {
      selectedPlantId.value = null;
      selectedPlantVariety.value = null;
      selectedPlantBreeder.value = null;
      selectedCreatedAt.value = readableDate(new Date());
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
      selectedCreatedAt,
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
        justify-content: space-between;
        padding: 10px;
        max-width: 140px;

        canvas {
          margin-bottom: 10px;
        }
      }
    }
  }

</style>
