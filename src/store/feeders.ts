import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Feeder } from '@/types';

const feederStore = defineStore('feeder', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const all = ref<Feeder[]>([]);

  async function fetch() {
    const result = await axios.get(`${process.env.VUE_APP_SERVER_ADDRESS}/feeders`);
    if (result.data) {
      all.value = result.data;
    }
  }

  async function add(feeder: Partial<Feeder>): Promise<boolean> {
    const formData = new FormData();
    formData.append('title', feeder.title || '');
    formData.append('picture', feeder.picture || '');
    formData.append('link', feeder.link || '');
    const result = await axios.post(`${SERVER}/feeders/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (result.status === 201) {
      await fetch();
      return true;
    }
    return false;
  }

  async function edit(feeder: Partial<Feeder>): Promise<boolean> {
    const formData = new FormData();
    formData.append('title', feeder.title || '');
    formData.append('picture', feeder.picture || '');
    formData.append('link', feeder.link || '');
    const result = await axios.put(`${SERVER}/feeders/edit/${feeder._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (result.status === 201) {
      await fetch();
      return true;
    }
    return false;
  }

  async function remove(id: string): Promise<boolean> {
    const result = await axios.delete(`${SERVER}/feeders/delete/${id}`);
    if (result.status === 201) {
      await fetch();
      return true;
    }
    return false;
  }

  fetch().then(
    () => console.info('Feeders data fetch success'),
  );

  return {
    fetch,
    all,
    add,
    edit,
    remove,
  };
});

export default feederStore;
