import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Plant } from '@/types';

const plantStore = defineStore('plant', () => {
  const all = ref<Plant[]>([]);

  async function fetch() {
    const result = await axios.get('https://grownaper.herokuapp.com/plants');
    if (result.data) {
      all.value = result.data;
    }
  }

  fetch().then(
    () => console.info('Breeder data fetch success'),
  );

  return {
    fetch,
    all,
  };
});

export default plantStore;
