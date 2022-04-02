import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { FeederProduct } from '@/common/types';

function generateFormData(feederProduct: Partial<FeederProduct>): FormData {
  const formData = new FormData();
  formData.append('title', feederProduct.title || '');
  formData.append('description', feederProduct.description || '');
  formData.append('picture', feederProduct.picture || '');
  formData.append('link', feederProduct.link || '');
  formData.append('feeder', feederProduct.feeder?._id || '');
  return formData;
}

const feederProductStore = defineStore('feeder-product', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const all = ref<FeederProduct[]>([]);

  async function fetch() {
    const result = await axios.get(`${SERVER}/feeders-products`);
    if (result.data) {
      all.value = result.data;
    }
  }

  async function add(feederProduct: Partial<FeederProduct>): Promise<boolean> {
    const params = generateFormData(feederProduct);
    console.log(params);
    console.log(feederProduct);
    const result = await axios.post(
      `${SERVER}/feeders-products/add`,
      params,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    if (result.status === 201) {
      await fetch();
      return true;
    }
    return false;
  }

  async function edit(feederProduct: Partial<FeederProduct>): Promise<boolean> {
    const params = generateFormData(feederProduct);
    const result = await axios.put(
      `${SERVER}/feeders-products/edit/${feederProduct._id}`,
      params,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    if (result.status === 201) {
      await fetch();
      return true;
    }
    return false;
  }

  async function remove(id: string): Promise<boolean> {
    const result = await axios.delete(`${SERVER}/feeders-products/delete/${id}`);
    if (result.status === 201) {
      await fetch();
      return true;
    }
    return false;
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
