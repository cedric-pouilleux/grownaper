import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import axios from 'axios';
import { Plant } from '@/types';

const SERVER = process.env.VUE_APP_SERVER_ADDRESS;

const plantStore = defineStore('plant', () => {
  const all = ref<Plant[]>([]);

  async function fetch(): Promise<void> {
    try {
      const result = await axios.get(`${SERVER}/plants`);
      all.value = result.data;
    } catch (err) {
      console.error('Data not found');
    }
  }

  async function add(plant: Plant): Promise<void> {
    try {
      await axios.post(`${SERVER}/plant/add`, plant);
      await fetch();
    } catch (err) {
      console.error(err);
    }
  }

  async function edit(plant: Plant): Promise<void> {
    try {
      await axios.put(`${SERVER}/plant/edit`, plant);
      await fetch();
    } catch (err) {
      console.error(err);
    }
  }

  async function remove(id: string): Promise<void> {
    try {
      await axios.delete(`${SERVER}/plant/delete/${id}`);
      await fetch();
    } catch (err) {
      console.error(err);
    }
  }

  fetch().then(
    () => console.info('Plants data fetch success'),
  );

  return {
    fetch,
    add,
    edit,
    remove,
    all,
  };
});

export default plantStore;
