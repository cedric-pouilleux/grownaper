import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Breeder } from '@/common/types';

const breederStore = defineStore('breeder', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const all = ref<Breeder[]>([]);

  async function fetch() {
    const result = await axios.get(`${SERVER}/breeders`);
    if (result.data) {
      all.value = result.data;
    }
  }

  async function add(breeder: Partial<Breeder>): Promise<boolean> {
    const formData = new FormData();
    formData.append('title', breeder.title || '');
    formData.append('country', breeder.country || '');
    formData.append('picture', breeder.picture || '');
    formData.append('link', breeder.link || '');
    const result = await axios.post(`${SERVER}/breeder/add`, formData, {
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

  async function edit(breeder: Partial<Breeder>): Promise<boolean> {
    const formData = new FormData();
    formData.append('_id', breeder._id || '');
    formData.append('title', breeder.title || '');
    formData.append('country', breeder.country || '');
    formData.append('picture', breeder.picture || '');
    formData.append('link', breeder.link || '');
    const result = await axios.put(`${SERVER}/breeder/edit`, formData, {
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
    const result = await axios.delete(`${SERVER}/breeder/delete/${id}`);
    if (result.status === 201) {
      await fetch();
      return true;
    }
    return false;
  }

  fetch().then(
    () => console.info('Breeder data fetch success'),
  );

  return {
    fetch,
    all,
    add,
    remove,
    edit,
  };
});

export default breederStore;
