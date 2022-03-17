import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Variety } from '@/types';

const varietyStore = defineStore('variety', () => {
  const all = ref<Variety[]>([]);

  async function fetch() {
    const result = await axios.get('https://grownaper.herokuapp.com/varieties');
    if (result.data) {
      all.value = result.data;
    }
  }

  return {
    fetch,
    all,
  };
});

export default varietyStore;
