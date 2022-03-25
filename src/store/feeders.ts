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

  async function add(feeder: Partial<Feeder>): Promise<void> {
    const formData = new FormData();
    formData.append('title', feeder.title || '');
    formData.append('picture', feeder.picture || '');
    formData.append('link', feeder.link || '');
    try {
      await axios.post(`${SERVER}/feeders/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetch();
    } catch (err) {
      console.error(err);
    }
  }

  async function edit(feeder: Partial<Feeder>): Promise<void> {
    const formData = new FormData();
    formData.append('title', feeder.title || '');
    formData.append('picture', feeder.picture || '');
    formData.append('link', feeder.link || '');
    try {
      await axios.put(`${SERVER}/feeders/edit/${feeder._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetch();
    } catch (err) {
      console.error(err);
    }
  }

  async function remove(id: string): Promise<void> {
    try {
      await axios.delete(`${SERVER}/feeders/delete/${id}`);
      await fetch();
    } catch (err) {
      console.error(err);
    }
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
