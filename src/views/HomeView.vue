<template>

  <el-container style="height: 60px;">
    <el-aside class="section-header" width="600px">
      <h2>Plants ({{count}})</h2>
    </el-aside>
    <el-container class="section-header">
      <h2>{{ selectedPlant?.name || 'Selected plant' }}</h2>
      <div class="btn">

      </div>
    </el-container>
    <el-aside style="background-color: #333">
        test
    </el-aside>
  </el-container>

  <el-container style="height: calc(100vh - 60px - 59px);">
    <el-aside width="600px" style="background-color: #333">
      <el-scrollbar>
        <plant-list @select="selectPlant"/>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <div class="toolbar">
          <plant-screen v-if="selectedPlant" :plant="selectedPlant" />
        </div>
      </el-header>
    </el-container>
    <el-aside style="background-color: #333">
      <el-scrollbar>
        <el-header>
          <div class="toolbar">
            <h2>Agenda</h2>
          </div>
        </el-header>
      </el-scrollbar>
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlantList from '@/components/admin/list/PlantList.vue';
import PlantStore from '@/store/plants';
import PlantScreen from '@/components/screen/PlantScreen.vue';
import { Plant } from '@/types';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantScreen,
    PlantList,
  },
  setup() {
    const count = ref<number>(0);
    const plantStore = PlantStore();
    const selectedPlant = ref<Plant | null>(null);

    plantStore.fetch().then((result) => {
      count.value = result.length;
    });

    function selectPlant(plant: Plant) {
      selectedPlant.value = plant;
    }

    return {
      count,
      selectedPlant,
      selectPlant,
    };
  },
});
</script>

<style lang="scss" scoped>
.section-header {
  padding: 16px;
  h2 {
    font-size: 1.4em;
  }
}
</style>
