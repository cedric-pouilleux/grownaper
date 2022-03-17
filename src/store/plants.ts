import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

type Plant = {
  _id: string,
  createdAt: Date,
  variety: string,
  breeder: string
}

const plantStore = defineStore('plant', () => {
  const all = ref<Plant[]>([]);

  async function fetch() {
    const result = await axios.get('https://grownaper.herokuapp.com/plants');
    if (result.data) {
      all.value = result.data;
    }
  }

  return {
    fetch,
    all,
  };
});

export default plantStore;
