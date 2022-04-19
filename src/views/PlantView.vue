<template>

  <add-plant :opened="isPlantFormOpened"
             @close="togglePlantForm"
             @add="addPlant"/>
  <el-container :offset="10" style="height: calc(100vh - 59px);">
    <!-- PlantResource list -->
    <el-container style="min-width: 600px; max-width: 600px;" direction="vertical">
      <plant-list :plants="all" @select="selectPlant" @new-plant="togglePlantForm"/>
    </el-container>
    <!-- Selected plant infos -->
    <template v-if="selectedPlant">
      <el-container direction="vertical">
        <el-main>
          <el-row :gutter="30">
            <el-col :span="24" :md="24" :lg="12" :xl="12">
              <plant-identification-resume :plant="selectedPlant"
                                           @remove-plant="clearSelectedPlant"
                                           @edit-status-plant="selectPlant"
                                           @open-edit-plant="openEditPlant"/>
              <flowering-date-form v-if="isEditPlantOpen"
                                   :plant="selectedPlant"
                                   :compare="comparePlant"
                                   @change="editPlant"
                                   @save="selectPlant"/>
              <plant-time-reading :plant="selectedPlant" />
              <plant-end-actions :plant="selectedPlant" @edit="selectPlant"/>
              <plant-note :plant="selectedPlant" @add-note="selectPlant"/>
              <br/>
              <plant-pictures />
            </el-col>
            <el-col :span="24" :md="24" :lg="12" :xl="12">
              <plant-timeline :plant="selectedPlant" />
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <!-- Selected plant history -->
      <el-container style="max-width: 280px; min-width: 280px" direction="vertical">
        <plant-history-header @change-history-mode="changeHistoryMode" />
        <plant-history-resume :history="selectedPlant.history" :mode="historyMode" />
      </el-container>
    </template>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlantList from '@/components/widget/plant-list/PlantList.vue';
import PlantStore from '@/store/plants';
import AddPlant from '@/components/form/AddPlant.vue';
import PlantHistoryResume from '@/components/widget/plant-history/PlantHistoryResume.vue';
import { Plus } from '@element-plus/icons-vue';
import PlantHistoryHeader from '@/components/widget/plant-history/PlantHistoryHeader.vue';
import PlantIdentificationResume from '@/components/widget/plant-identification/PlantIdentificationResume.vue';
import PlantEndActions from '@/components/widget/plant-time/PlantStatusActions.vue';
import FloweringDateForm from '@/components/widget/plant-edition/PlantEdition.vue';
import { storeToRefs } from 'pinia';
import PlantNote from '@/components/widget/plant-note/PlantNote.vue';
import PlantPictures from '@/components/widget/plant-pictures/PlantPictures.vue';
import PlantResource from '@/resources/PlantResource';
import PlantTimeReading from '@/components/widget/plant-time/PlantStatusTime.vue';
import PlantTimeline from '@/components/widget/plant-timeline/PlantTimeline.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantTimeline,
    PlantTimeReading,
    PlantPictures,
    PlantNote,
    PlantHistoryHeader,
    PlantHistoryResume,
    PlantEndActions,
    AddPlant,
    PlantList,
    PlantIdentificationResume,
    FloweringDateForm,
  },
  setup() {
    const plantStore = PlantStore();
    const selectedPlant = ref<PlantResource | null>(null);
    const comparePlant = ref<PlantResource | null>(null);
    const historyMode = ref<string>('PER_DAYS');
    const isEditPlantOpen = ref<boolean>(false);
    const isPlantFormOpened = ref<boolean>(false);
    const { all } = storeToRefs(plantStore);

    function openEditPlant(): void {
      isEditPlantOpen.value = !isEditPlantOpen.value;
    }

    function selectPlant(plant: PlantResource): void {
      selectedPlant.value = plant;
      comparePlant.value = plant;
    }

    function addPlant(plant: PlantResource): void {
      selectPlant(plant);
      isPlantFormOpened.value = false;
    }

    function editPlant(plant: PlantResource): void {
      selectedPlant.value = new PlantResource(plant);
    }

    return {
      historyMode,
      clearSelectedPlant: () => { selectedPlant.value = null; },
      isPlantFormOpened,
      comparePlant,
      isEditPlantOpen,
      all,
      selectedPlant,
      addPlant,
      selectPlant,
      editPlant,
      togglePlantForm: (): void => { isPlantFormOpened.value = !isPlantFormOpened.value; },
      changeHistoryMode: (mode: string): void => { historyMode.value = mode; },
      openEditPlant,
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
