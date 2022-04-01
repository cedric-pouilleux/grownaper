<template>
  <el-tabs class="demo-tabs" v-model="activeName">
    <el-tab-pane label="Timing" name="timing">
      <plant-timing-resume :plant="plant" />
    </el-tab-pane>
    <el-tab-pane label="Variety" name="variety">
      <plant-variety-resume :variety="plant.variety" />
    </el-tab-pane>
    <el-tab-pane label="Identification" name="identification">
      <plant-identification-resume :qrcode="plant.qrcode" :database-id="plant._id" />
    </el-tab-pane>
    <el-tab-pane label="Notes" name="notes">
      <plant-notes-resume />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Plant } from '@/types';
import { Plus } from '@element-plus/icons-vue';
import PlantVarietyResume from '@/components/screen/ui/PlantVarietyResume.vue';
import PlantIdentificationResume from '@/components/screen/ui/PlantIdentificationResume.vue';
import PlantTimingResume from '@/components/screen/ui/PlantTimingResume.vue';
import PlantNotesResume from '@/components/screen/ui/PlantNotesResume.vue';

export default defineComponent({
  name: 'PlantScreen',
  components: {
    PlantNotesResume,
    PlantTimingResume,
    PlantIdentificationResume,
    PlantVarietyResume,
  },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  setup() {
    const activeName = ref('timing');
    return {
      Plus,
      activeName,
    };
  },
});
</script>

<style scoped lang="scss">
.plant-screen {
  &__section {
    padding: 12px;
    width: 100%;
  }
}
</style>
