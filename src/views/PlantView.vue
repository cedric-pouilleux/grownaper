<template>

  <add-plant :opened="isPlantFormOpened" @close="closeForm"/>

  <el-container :offset="10" style="height: calc(100vh - 59px);">

    <!-- Plant list -->
    <el-container style="min-width: 450px; max-width: 500px;"
                  direction="vertical">
      <plant-list-header :count="count" @new-plant="openNewPlantForm" />
      <plant-list @select="selectPlant"/>
    </el-container>

    <!-- Selected plant infos -->
    <el-container direction="vertical">
      <plant-selection-header :name="selectedPlant.name"  />
      <el-main>
        <el-row :gutter="40">
          <el-col :span="24" :lg="12" :xl="12">
            <plant-identification-resume :variety="selectedPlant.variety"
                                         :qrcode="selectedPlant.qrcode"
                                         :database-id="selectedPlant._id" />
          </el-col>
          <el-col :span="24" :lg="12" :xl="12">
            <plant-timing-resume :floTime="selectedPlant.variety?.floTime"
                                 :startFloweringDate="selectedPlant.startFloweringDate"/>
          </el-col>
        </el-row>
        <plant-screen v-if="selectedPlant._id"
                      :plant="selectedPlant"
                      @change="changePlant"/>
      </el-main>
    </el-container>

    <!-- Selected plant history -->
    <el-container style="max-width: 280px; min-width: 280px" direction="vertical">
      <plant-history-header />
      <plant-history-resume :history="selectedPlant.history" />
    </el-container>

  </el-container>
</template>

<script lang="ts">
import {
  defineComponent, reactive, computed, toRef, ref,
} from 'vue';
import PlantTimingResume from '@/components/screen/ui/PlantTimingResume.vue';
import PlantList from '@/components/PlantList.vue';
import PlantStore from '@/store/plants';
import PlantScreen from '@/components/screen/PlantScreen.vue';
import { Plant } from '@/common/types';
import AddPlant from '@/components/screen/form/AddPlant.vue';
import PlantHistoryResume from '@/components/screen/ui/PlantHistoryResume.vue';
import { Plus } from '@element-plus/icons-vue';
import PlantListHeader from '@/components/screen/ui/PlantListHeader.vue';
import PlantSelectionHeader from '@/components/screen/ui/PlantSelectionHeader.vue';
import PlantHistoryHeader from '@/components/screen/ui/PlantHistoryHeader.vue';
import PlantIdentificationResume from '@/components/screen/ui/PlantIdentificationResume.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantHistoryHeader,
    PlantSelectionHeader,
    PlantListHeader,
    PlantHistoryResume,
    AddPlant,
    PlantScreen,
    PlantList,
    PlantTimingResume,
    PlantIdentificationResume,
  },
  setup() {
    const count = ref<number>(0);
    const plantStore = PlantStore();
    const selectedPlant = reactive<Partial<Plant>>({});
    const isPlantFormOpened = ref<boolean>(false);

    const history = toRef(selectedPlant, 'history');

    plantStore.fetch().then((result: Plant[]) => {
      count.value = result.length;
    });

    function openNewPlantForm() {
      isPlantFormOpened.value = true;
    }

    function selectPlant(plant: Plant): void {
      Object.assign(selectedPlant, plant);
    }

    function closeForm(): void {
      isPlantFormOpened.value = false;
    }

    async function removePlant(): Promise<void> {
      if (selectedPlant._id) {
        await plantStore.remove(selectedPlant._id);
      }
    }

    function changePlant(plant: Plant) {
      Object.assign(selectedPlant, plant);
    }

    return {
      count,
      isPlantFormOpened,
      openNewPlantForm,
      plantStore,
      selectedPlant,
      selectPlant,
      closeForm,
      removePlant,
      changePlant,
      Plus,
      history,
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
