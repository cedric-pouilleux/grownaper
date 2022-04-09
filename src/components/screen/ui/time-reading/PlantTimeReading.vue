<template>
  <div class="plant-time-reading">
    <div class="plant-time-reading__progress">
      <growing-progress :plant="plant" />
    </div>
    <div class="plant-time-reading__progress">
      <flowering-progress :plant="plant"/>
    </div>
    <div class="plant-time-reading__progress">
      <drying-progress :plant="plant"/>
    </div>
    <div class="plant-time-reading__progress">
      <curring-progress :plant="plant"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlantResource from '@/resources/PlantResource';
import GrowingProgress from '@/components/screen/ui/time-reading/plant-progress/GrowingProgress.vue';
import FloweringProgress from '@/components/screen/ui/time-reading/plant-progress/FloweringProgress.vue';
import DryingProgress from '@/components/screen/ui/time-reading/plant-progress/DryingProgress.vue';
import CurringProgress from '@/components/screen/ui/time-reading/plant-progress/CurringProgress.vue';

export default defineComponent({
  name: 'PlantTimeReading',
  components: {
    GrowingProgress,
    FloweringProgress,
    DryingProgress,
    CurringProgress,
  },
  props: {
    plant: {
      type: PlantResource,
    },
  },
});
</script>

<style lang="scss" scoped>
.plant-time-reading {
  &__progress {
    margin: 6px 0;
  }
}
</style>
