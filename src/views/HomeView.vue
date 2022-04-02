<template>

  <add-plant :opened="isPlantFormOpened" @close="closeForm"/>

  <el-container style="height: 60px;">
    <el-aside class="section-header" width="600px">
      <h2>Plants ({{count}})</h2>
      <el-button type="primary"
                 :icon="Plus"
                 @click="openForm">
        New
      </el-button>
    </el-aside>
    <el-container class="section-header">
      <h2>{{ selectedPlant?.name || 'Selected plant' }}</h2>
      <div v-if="selectedPlant">
        <el-button type="primary">Actions</el-button>
        <el-button type="danger" @click="removePlant">Remove</el-button>
      </div>
    </el-container>
    <el-aside class="section-header">
      <h2> History</h2>
    </el-aside>
  </el-container>

  <!-- container flex -->
  <el-container style="height: calc(100vh - 60px - 59px);">
    <el-aside width="600px" style="background-color: #333">
      <el-scrollbar>
        <plant-list @select="selectPlant"/>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <div class="toolbar">
          <plant-screen v-if="selectedPlant._id" :plant="selectedPlant" @change="changePlant"/>
        </div>
      </el-header>
    </el-container>
    <el-aside>
      <el-scrollbar>
        <plant-history-resume :history="selectedPlant?.history" />
      </el-scrollbar>
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import PlantList from '@/components/PlantList.vue';
import PlantStore from '@/store/plants';
import PlantScreen from '@/components/screen/PlantScreen.vue';
import { Plant, Variety } from '@/common/types';
import AddPlant from '@/components/screen/form/AddPlant.vue';
import PlantHistoryResume from '@/components/screen/ui/PlantHistoryResume.vue';
import { Plus } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantHistoryResume,
    AddPlant,
    PlantScreen,
    PlantList,
  },
  setup() {
    const count = ref<number>(0);
    const plantStore = PlantStore();
    const selectedPlant = reactive<Partial<Plant>>({});
    const isPlantFormOpened = ref<boolean>(false);

    plantStore.fetch().then((result: Plant[]) => {
      count.value = result.length;
    });

    function selectPlant(plant: Plant): void {
      Object.assign(selectedPlant, plant);
    }

    function openForm(): void {
      isPlantFormOpened.value = true;
    }

    function closeForm(): void {
      isPlantFormOpened.value = false;
    }

    async function removePlant(): Promise<void> {
      if (selectedPlant._id) {
        await plantStore.remove(selectedPlant._id);
      }
    }

    function changePlant(data:{ startFloweringDate: Date, variety: Variety }) {
      if (selectedPlant) {
        selectedPlant.startFloweringDate = data.startFloweringDate;
        selectedPlant.variety = data.variety;
      }
    }

    return {
      count,
      isPlantFormOpened,
      selectedPlant,
      selectPlant,
      openForm,
      closeForm,
      removePlant,
      changePlant,
      Plus,
    };
  },
});
</script>

<style lang="scss" scoped>
.section-header {
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    font-size: 1.4em;
  }
}
</style>
