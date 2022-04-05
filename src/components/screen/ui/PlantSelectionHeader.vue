<template>
  <el-header class="view-header">
    <h2>
      {{ plant.name }}
      <plant-variety-resume :variety="plant.variety" />
    </h2>
    <div class="view-header__tools">
      <el-popconfirm v-if="displayCollectBtn"
                     title="Are you sure to collect this plant ?"
                     @confirm="cutPlant">
        <template #reference>
          <el-button type="warning"
                     effect="plain"
                     size="small"
                     round plain>
            Collect
          </el-button>
        </template>
      </el-popconfirm>
      <el-button v-if="plant.collected"
                 disabled
                 type="success"
                 size="small"
                 @click="cutPlant"
                 round plain>
        Collected
      </el-button>
      <el-button v-if="displayStartFloweringBtn"
                 type="success"
                 size="small"
                 @click="startFlowering"
                 round plain>
        Start flowering
      </el-button>
    </div>
  </el-header>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import PlantVarietyResume from '@/components/screen/ui/PlantVarietyResume.vue';
import { Plant } from '@/common/types';

export default defineComponent({
  name: 'PlantSelectionHeader',
  components: { PlantVarietyResume },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  emits: ['cut-plant', 'start-flowering'],
  setup(props, { emit }) {
    const displayCollectBtn = computed((): boolean => !props.plant.collected && props.plant.floweringStarted);
    const displayStartFloweringBtn = computed((): boolean => !props.plant.floweringStarted && !props.plant.collected);
    return {
      cutPlant: () => emit('cut-plant'),
      startFlowering: () => emit('start-flowering'),
      displayCollectBtn,
      displayStartFloweringBtn,
    };
  },
});
</script>
