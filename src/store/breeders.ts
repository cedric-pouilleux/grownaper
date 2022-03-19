import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Breeder } from '@/types';

const breederStore = defineStore('breeder', () => {
  const all = ref<Breeder[]>([]);

  async function fetch() {
    const result = await axios.get(`${process.env.VUE_APP_SERVER_ADDRESS}/breeders`);
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

export default breederStore;
