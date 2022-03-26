import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { FeederProduct } from '@/types';

const feederProductStore = defineStore('feeder-product', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const all = ref<FeederProduct[]>([]);

  async function fetch() {
    const result = await axios.get(`${SERVER}/feeders-products`);
    if (result.data) {
      all.value = result.data;
    }
  }

  async function add(feederProduct: Partial<FeederProduct>, formData: FormData): Promise<void> {
    try {
      await axios.post(`${SERVER}/feeders-products/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetch();
    } catch (err) {
      console.error(err);
    }
  }

  async function edit(feederProduct: Partial<FeederProduct>, formData: FormData): Promise<void> {
    try {
      await axios.put(`${SERVER}/feeders-products/edit/${feederProduct._id}`, formData, {
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
      await axios.delete(`${SERVER}/feeders-products/delete/${id}`);
      await fetch();
    } catch (err) {
      console.error(err);
    }
  }

  fetch().then(
    () => console.info('Feeders product data fetch success'),
  );

  return {
    fetch,
    all,
    add,
    edit,
    remove,
  };
});

export default feederProductStore;
