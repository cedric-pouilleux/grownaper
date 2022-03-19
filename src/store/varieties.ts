import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Variety } from '@/types';

const varietyStore = defineStore('variety', () => {
  const all = ref<Variety[]>([]);

  async function fetch() {
    const result = await axios.get(`${process.env.VUE_APP_SERVER_ADDRESS}/varieties`);
    if (result.data) {
      all.value = result.data;
    }
  }

  fetch().then(
    () => console.info('Varieties data fetch success'),
  );

  return {
    fetch,
    all,
  };
});

export default varietyStore;
