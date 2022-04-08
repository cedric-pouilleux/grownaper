<template>

  <add-plant :opened="isPlantFormOpened"
             @close="togglePlantForm"
             @add="addPlant"/>

  <el-container :offset="10" style="height: calc(100vh - 59px);">

    <!-- PlantResource list -->
    <el-container style="min-width: 600px; max-width: 600px;" direction="vertical">
      <plant-list-header :count="all.length" @new-plant="togglePlantForm" />
      <plant-list :plants="all" @select="selectPlant"/>
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
                                   :can-save="!canSave"
                                   @change="editPlant"
                                   @save="savePlant"/>
              <plant-end-timing-resume :plant="selectedPlant"/>
            </el-col>
            <el-col :span="24" :md="24" :lg="12" :xl="12">
              <plant-finished-resume v-if="selectedPlant.startCurringDate" :plant="selectedPlant" />
              <br/>
              <plant-note :plant="selectedPlant" @add-note="selectPlant"/>
              <br/>
              <plant-pictures />
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
import {
  defineComponent, computed, ref, ComputedRef,
} from 'vue';
// import PlantTimingResume from '@/components/screen/ui/PlantTimingResume.vue';

import PlantList from '@/components/PlantList.vue';
import PlantStore from '@/store/plants';
import AddPlant from '@/components/screen/form/AddPlant.vue';
import PlantHistoryResume from '@/components/screen/ui/PlantHistoryResume.vue';
import { Plus } from '@element-plus/icons-vue';
import PlantListHeader from '@/components/screen/ui/PlantListHeader.vue';
import PlantHistoryHeader from '@/components/screen/ui/PlantHistoryHeader.vue';
import PlantIdentificationResume from '@/components/screen/ui/PlantIdentificationResume.vue';
import PlantEndTimingResume from '@/components/screen/ui/PlantEndTimingResume.vue';
import FloweringDateForm from '@/components/screen/form/EditPlant.vue';
import { storeToRefs } from 'pinia';
import Moment from 'moment';
import { isEqual } from '@/common/utils';
import { ElNotification } from 'element-plus';
import PlantNote from '@/components/screen/ui/PlantNote.vue';
import PlantPictures from '@/components/screen/ui/PlantPictures.vue';
import PlantFinishedResume from '@/components/screen/ui/PlantFinishedResume.vue';
import PlantResource from '@/resources/PlantResource';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantFinishedResume,
    PlantPictures,
    PlantNote,
    PlantHistoryHeader,
    PlantListHeader,
    PlantHistoryResume,
    AddPlant,
    PlantList,
    PlantIdentificationResume,
    FloweringDateForm,
    PlantEndTimingResume,
  },
  setup() {
    const plantStore = PlantStore();
    const selectedPlant = ref<PlantResource | null>(null);
    const comparePlant = ref<PlantResource | null>(null);
    const historyMode = ref<string>('PER_DAYS');
    const isEditPlantOpen = ref<boolean>(false);
    const isPlantFormOpened = ref<boolean>(false);
    const { all } = storeToRefs(plantStore);

    function selectPlant(plant: PlantResource): void {
      selectedPlant.value = new PlantResource(plant);
      comparePlant.value = new PlantResource(plant);
    }

    function addPlant(plant: PlantResource): void {
      selectPlant(plant);
      isPlantFormOpened.value = false;
    }

    const isSameDate: ComputedRef<boolean> = computed(
      (): boolean => Moment(comparePlant.value?.startFloweringDate)
        .isSame(selectedPlant.value?.startFloweringDate, 'day'),
    );

    const isSameVariety: ComputedRef<boolean> = computed(
      (): boolean => isEqual(comparePlant.value?.variety, selectedPlant.value?.variety),
    );

    const isSameName: ComputedRef<boolean> = computed(
      (): boolean => comparePlant.value?.name === selectedPlant.value?.name,
    );

    const canSave: ComputedRef<boolean> = computed(
      (): boolean => isSameName.value && isSameVariety.value && isSameDate.value,
    );

    function editPlant(plant: PlantResource): void {
      selectedPlant.value = new PlantResource(plant);
    }

    async function savePlant(plant: PlantResource): Promise<void> {
      const params: Partial<PlantResource> = {
        ...!isSameVariety.value ? { variety: plant.variety } : {},
        ...!isSameName.value ? { name: plant.name } : {},
        ...!isSameDate.value ? { startFloweringDate: plant.startFloweringDate } : {},
      };
      if (plant._id) {
        const edited = await plantStore.edit(plant._id, params);
        if (edited) {
          ElNotification.success({
            message: `PlantResource ${edited.name} has been edited`,
            offset: 100,
          });
          selectedPlant.value = new PlantResource(edited);
          comparePlant.value = new PlantResource(edited);
        }
      }
    }

    function openEditPlant(): void {
      isEditPlantOpen.value = !isEditPlantOpen.value;
    }

    return {
      historyMode,
      clearSelectedPlant: () => { selectedPlant.value = null; },
      isPlantFormOpened,
      isEditPlantOpen,
      all,
      selectedPlant,
      canSave,
      addPlant,
      selectPlant,
      savePlant,
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
