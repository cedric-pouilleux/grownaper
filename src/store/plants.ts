import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Plant, Variety } from '@/common/types';

const plantStore = defineStore('plant', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const all = ref<Plant[]>([]);

  async function fetch(): Promise<Plant[] | []> {
    try {
      const result = await axios.get(`${SERVER}/plants`);
      all.value = result.data;
      return all.value;
    } catch (err) {
      console.error('Data not found');
      return [];
    }
  }

  async function add(plant: Partial<Plant>): Promise<Plant | null> {
    const result = await axios.post(`${SERVER}/plant/add`, plant);
    if (result.status === 201) {
      await fetch();
      return result.data;
    }
    return null;
  }

  async function addNote(plantId: string, noteContent: string): Promise<void> {
    try {
      await axios.post(`${SERVER}/plant/notes/add/${plantId}`, {
        date: new Date(),
        content: noteContent,
      });
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

  async function edit(
    plantId: string,
    data: { startFloweringDate?: Date | null, variety?: Variety| null },
  ): Promise<Plant | null> {
    const result = await axios.put(`${SERVER}/plant/edit/${plantId}`, data);
    if (result.status === 201) {
      await fetch();
      return result.data;
    }
    return null;
  }

  async function cut(id: string): Promise<Plant | null> {
    const result = await axios.put(`${SERVER}/plant/cut/${id}`);
    if (result.status === 201) {
      await fetch();
      return result.data;
    }
    return null;
  }

  async function startFlowering(id: string): Promise<Plant | null> {
    const result = await axios.put(`${SERVER}/plant/start-flowering/${id}`);
    if (result.status === 201) {
      await fetch();
      return result.data;
    }
    return null;
  }

  fetch().then(() => {
    console.info('All plants feetch');
  });

  return {
    addNote,
    fetch,
    add,
    edit,
    remove,
    cut,
    startFlowering,
    all,
  };
});

export default plantStore;
