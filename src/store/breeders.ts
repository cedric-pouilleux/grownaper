import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

type Breeder = {
  _id: string,
  title: string,
  picture?: string,
  link?: string,
}

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
