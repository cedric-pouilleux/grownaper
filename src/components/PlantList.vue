<template>
  <div class="plants-list">
    <h2>Plants list</h2>
    <PlantForm :selected="selectedPlant" @cancel="cancel"/>
    <ul>
      <li v-for="plant in all" :key="plant._id" :data-id="plant._id">
        <header>
          <h3 v-if="plant.name">{{ plant.name }}</h3>
          <p v-if="plant.variety">{{ plant.variety?.title }}</p>
          <p v-if="plant.breeder">{{ plant.breeder?.title }}</p>
          <div class="plants-list__createdAt">
            {{ inputDateFormat(plant.createdAt) }}
          </div>
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
import { defineComponent, ref } from 'vue';
import PlantForm from '@/components/PlantForm.vue';
import plantStore from '@/store/plants';
import QrcodeVue from 'qrcode.vue';
import { Plant } from '@/types';
import moment from 'moment';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'PlantList',

  components: {
    QrcodeVue,
    PlantForm,
  },

  setup() {
    const store = plantStore();
    const { all } = storeToRefs(store);

    const selectedPlant = ref<Plant | null>(null);

    return {
      remove: (id: string) => store.remove(id),
      selectedPlant,
      all,
      edit: (plant: Plant) => { selectedPlant.value = plant; },
      cancel: () => { selectedPlant.value = null; },
      inputDateFormat: (date: Date | string): string => moment(date).format('YYYY-MM-DD'),
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
        justify-content: flex-end;
        padding: 10px;
        max-width: 140px;

        canvas {
          margin-bottom: 10px;
        }
      }
    }
  }

</style>
