<template>

  <add-plant :opened="isPlantFormOpened"
             @close="togglePlantForm"
             @add="addPlant"/>
  <el-container :offset="10" style="height: calc(100vh - 59px);">
    <!-- Plant list -->
    <el-container style="min-width: 600px; max-width: 600px;" direction="vertical">
      <plant-list-header :count="all.length" @new-plant="togglePlantForm" />
      <plant-list :plants="all" @select="selectPlant"/>
    </el-container>
    <!-- Selected plant infos -->
    <template v-if="selectedPlant._id">
      <el-container direction="vertical">
        <plant-selection-header :name="selectedPlant.name"
                                :variety="selectedPlant.variety"
                                :collected="selectedPlant.floweringStarted && selectedPlant.collected"
                                :flowering="selectedPlant.floweringStarted"
                                @remove="removePlant"
                                @start-flowering="startFlowering"
                                @cut-plant="cutPlant"/>
        <flowering-date-form v-if="!selectedPlant.collected"
                             :plant="selectedPlant"
                             :can-save="!canSave"
                             @change="editPlant"
                             @save="savePlant"/>
        <el-main>
          <el-row :gutter="40">
            <el-col :span="24" :md="24" :lg="10" :xl="10">
              <plant-identification-resume :variety="selectedPlant.variety"
                                           :qrcode="selectedPlant.qrcode"
                                           :database-id="selectedPlant._id" />
            </el-col>
            <el-col :span="24" :md="24" :lg="14" :xl="14">
              <plant-timing-resume :floTime="selectedPlant.variety?.floTime || null"
                                   :startFloweringDate="selectedPlant.startFloweringDate || null"
                                   :collected="selectedPlant.collected"
                                   @change="selectPlant"/>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <!-- Selected plant history -->
      <el-container style="max-width: 280px; min-width: 280px" direction="vertical">
        <plant-history-header />
        <plant-history-resume :history="selectedPlant.history" />
      </el-container>
    </template>
  </el-container>
</template>

<script lang="ts">
import {
  defineComponent, reactive, computed, ref, ComputedRef,
} from 'vue';
import PlantTimingResume from '@/components/screen/ui/PlantTimingResume.vue';
import PlantList from '@/components/PlantList.vue';
import PlantStore from '@/store/plants';
import { Plant } from '@/common/types';
import AddPlant from '@/components/screen/form/AddPlant.vue';
import PlantHistoryResume from '@/components/screen/ui/PlantHistoryResume.vue';
import { Plus } from '@element-plus/icons-vue';
import PlantListHeader from '@/components/screen/ui/PlantListHeader.vue';
import PlantSelectionHeader from '@/components/screen/ui/PlantSelectionHeader.vue';
import PlantHistoryHeader from '@/components/screen/ui/PlantHistoryHeader.vue';
import PlantIdentificationResume from '@/components/screen/ui/PlantIdentificationResume.vue';
import FloweringDateForm from '@/components/screen/form/FloweringDateForm.vue';
import { storeToRefs } from 'pinia';
import Moment from 'moment';
import { isEqual } from '@/common/utils';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantHistoryHeader,
    PlantSelectionHeader,
    PlantListHeader,
    PlantHistoryResume,
    AddPlant,
    PlantList,
    PlantTimingResume,
    PlantIdentificationResume,
    FloweringDateForm,
  },
  setup() {
    const initial = {
      _id: null,
      name: null,
      variety: null,
      createdAt: null,
      qrcode: null,
      startFloweringDate: null,
      notes: null,
      history: null,
    };

    const plantStore = PlantStore();
    const selectedPlant = reactive<Partial<Plant>>({});
    const comparePlant = reactive<Partial<Plant>>({});

    const isPlantFormOpened = ref<boolean>(false);
    const { all } = storeToRefs(plantStore);

    async function removePlant(): Promise<void> {
      if (selectedPlant._id) {
        await plantStore.remove(selectedPlant._id);
        Object.assign(selectedPlant, initial);
      }
    }

    function selectPlant(plant: Plant): void {
      Object.assign(selectedPlant, plant);
      Object.assign(comparePlant, plant);
    }

    function addPlant(plant: Plant): void {
      selectPlant(plant);
      isPlantFormOpened.value = false;
    }

    function editPlant(plant: Plant): void {
      Object.assign(selectedPlant, plant);
    }

    const isSameDate: ComputedRef<boolean> = computed(
      (): boolean => Moment(comparePlant.startFloweringDate).isSame(selectedPlant.startFloweringDate, 'day'),
    );

    const isSameVariety: ComputedRef<boolean> = computed(
      (): boolean => isEqual(comparePlant.variety, selectedPlant.variety),
    );

    const isSameName: ComputedRef<boolean> = computed(
      (): boolean => comparePlant.name === selectedPlant.name,
    );

    const canSave: ComputedRef<boolean> = computed(
      (): boolean => isSameName.value && isSameVariety.value && isSameDate.value,
    );

    async function savePlant(plant: Plant): Promise<void> {
      const params: Partial<Plant> = {
        ...!isSameVariety.value ? { variety: plant.variety } : {},
        ...!isSameName.value ? { name: plant.name } : {},
        ...!isSameDate.value ? { startFloweringDate: plant.startFloweringDate } : {},
      };
      if (selectedPlant._id) {
        const edited = await plantStore.edit(selectedPlant._id, params);
        if (edited) {
          Object.assign(selectedPlant, edited);
          Object.assign(comparePlant, edited);
          ElNotification.success({
            message: `Plant ${edited.name} has been edited`,
            offset: 100,
          });
        }
      }
    }

    async function cutPlant(): Promise<void> {
      if (selectedPlant._id) {
        const edited = await plantStore.cut(selectedPlant._id);
        if (edited) {
          Object.assign(selectedPlant, edited);
          ElNotification.success({
            message: `Plant ${edited.name} has been cut`,
            offset: 100,
          });
        }
      }
    }

    async function startFlowering() {
      if (selectedPlant._id) {
        const edited = await plantStore.startFlowering(selectedPlant._id);
        if (edited) {
          Object.assign(selectedPlant, edited);
          ElNotification.success({
            message: `Plant ${edited.name} start flowering`,
            offset: 100,
          });
        }
      }
    }

    return {
      isPlantFormOpened,
      all,
      selectedPlant,
      canSave,
      cutPlant,
      addPlant,
      selectPlant,
      savePlant,
      editPlant,
      togglePlantForm: (): void => { isPlantFormOpened.value = !isPlantFormOpened.value; },
      startFlowering,
      removePlant,
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
