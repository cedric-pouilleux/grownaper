import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Variety } from '@/common/types';
import PlantResource from '@/resources/PlantResource';

const plantStore = defineStore('plant', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const all = ref<PlantResource[]>([]);

  async function fetch(): Promise<PlantResource[] | []> {
    try {
      const result = await axios.get(`${SERVER}/plants`);
      all.value = result.data.map((item: PlantResource) => new PlantResource(item));
      return all.value;
    } catch (err) {
      console.error('Data not found');
      return [];
    }
  }

  async function add(plant: Partial<PlantResource>): Promise<PlantResource | null> {
    const result = await axios.post(`${SERVER}/plant/add`, plant);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function addNote(plantId: string, content: string): Promise<PlantResource | null> {
    const result = await axios.post(`${SERVER}/plant/notes/add/${plantId}`, {
      content,
    });
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
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
  ): Promise<PlantResource | null> {
    const result = await axios.put(`${SERVER}/plant/edit/${plantId}`, data);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function cut(id: string): Promise<PlantResource | null> {
    const result = await axios.put(`${SERVER}/plant/cut/${id}`);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function startFlowering(id: string): Promise<PlantResource | null> {
    const result = await axios.put(`${SERVER}/plant/start-flowering/${id}`);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function startCurring(id: string, weight : number): Promise<PlantResource | null> {
    const result = await axios.put(`${SERVER}/plant/start-curring/${id}`, { weight });
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function startGrowing(id: string): Promise<PlantResource | null> {
    const result = await axios.put(`${SERVER}/plant/start-growing/${id}`);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetch().then(() => {
  });

  return {
    addNote,
    fetch,
    add,
    edit,
    remove,
    cut,
    startFlowering,
    startCurring,
    startGrowing,
    all,
  };
});

export default plantStore;
