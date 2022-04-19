import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Variety } from '@/common/types';
import PlantResource from '@/resources/PlantResource';
import { Api } from '@/api/Api';

const plantStore = defineStore('plant', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const all = ref<PlantResource[]>([]);

  async function fetch(): Promise<PlantResource[] | []> {
    try {
      const result = await Api.get(`${SERVER}/plants`);
      all.value = result.data.map((item: PlantResource) => new PlantResource(item));
      return all.value;
    } catch (err) {
      console.error('Data not found');
      return [];
    }
  }

  async function add(plant: Partial<PlantResource>): Promise<PlantResource | null> {
    console.log(plant);
    const result = await Api.post(`${SERVER}/plants/add`, plant);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function addNote(plantId: string, content: string): Promise<PlantResource | null> {
    const result = await Api.post(`${SERVER}/plants/notes/add/${plantId}`, {
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
      await Api.delete(`${SERVER}/plants/delete/${id}`);
      await fetch();
    } catch (err) {
      console.error(err);
    }
  }

  async function edit(
    plantId: string,
    data: { startFloweringDate?: Date | null, variety?: Variety| null },
  ): Promise<PlantResource | null> {
    const result = await Api.put(`${SERVER}/plants/edit/${plantId}`, data);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function cut(id: string): Promise<PlantResource | null> {
    const result = await Api.put(`${SERVER}/plants/cut/${id}`);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function startFlowering(id: string): Promise<PlantResource | null> {
    const result = await Api.put(`${SERVER}/plants/start-flowering/${id}`);
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function startCurring(id: string, weight : number): Promise<PlantResource | null> {
    const result = await Api.put(`${SERVER}/plants/start-curring/${id}`, { weight });
    if (result.status === 201) {
      await fetch();
      return new PlantResource(result.data);
    }
    return null;
  }

  async function startGrowing(id: string): Promise<PlantResource | null> {
    const result = await Api.put(`${SERVER}/plants/start-growing/${id}`);
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
