import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Variety } from '@/types';

const varietyStore = defineStore('variety', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const all = ref<Variety[]>([]);

  async function fetch(): Promise<void> {
    const result = await axios.get(`${SERVER}/varieties`);
    if (result.data) {
      all.value = result.data;
    }
  }

  async function add(variety: Partial<Variety>): Promise<void> {
    try {
      await axios.post(`${SERVER}/variety/add`, variety);
      await fetch();
    } catch (err) {
      console.log(err);
    }
  }

  async function edit(variety: Partial<Variety>): Promise<void> {
    try {
      await axios.put(`${SERVER}/variety/edit`, variety);
      await fetch();
    } catch (err) {
      console.log(err);
    }
  }

  async function remove(id: string): Promise<boolean> {
    const result = await axios.delete(`${SERVER}/variety/delete/${id}`);
    if (result.status === 201) {
      await fetch();
      return true;
    }
    return false;
  }

  fetch().then(
    () => console.info('Varieties data fetch success'),
  );

  return {
    fetch,
    edit,
    all,
    add,
    remove,
  };
});

export default varietyStore;
