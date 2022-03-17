import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Breeder } from '@/types';

const breederStore = defineStore('breeder', () => {
  const all = ref<Breeder[]>([]);

  async function fetch() {
    const result = await axios.get('https://grownaper.herokuapp.com/breeders');
    if (result.data) {
      all.value = result.data;
    }
  }

  return {
    fetch,
    all,
  };
});

export default breederStore;
