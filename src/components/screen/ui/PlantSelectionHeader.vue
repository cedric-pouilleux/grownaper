<template>
  <el-header class="view-header">
    <h2>
      {{ plant.name }}
      <plant-variety-resume :variety="plant.variety" />
    </h2>
    <div class="view-header__tools">
      <el-popconfirm v-if="displayCollectBtn" title="Are you sure to collect this plant ?" @confirm="cutPlant">
        <template #reference>
          <el-button type="warning" effect="plain" size="small" round plain>
            Collect
          </el-button>
        </template>
      </el-popconfirm>
      <el-button v-if="plant.collected" disabled type="success" size="small" @click="cutPlant" round plain>
        Collected
      </el-button>
      <el-popover trigger="hover" v-if="displayStartCurringBtn">
        <template #reference>
          <el-button type="warning" size="small" round plain>
            Start curring
          </el-button>
        </template>
        <el-form :inline="true" size="small" >
          <el-form-item label="Weight">
            <el-input style="max-width: 30px;" type="number" v-model="weight"/>
            <el-button type="primary" plain round @click="startCurring">Start</el-button>
          </el-form-item>
        </el-form>
      </el-popover>
      <el-button v-if="displayStartFloweringBtn" type="success" size="small" @click="startFlowering" round plain>
        Start flowering
      </el-button>
    </div>
  </el-header>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref, watch,
} from 'vue';
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
  emits: ['cut-plant', 'start-flowering', 'start-curring'],
  setup(props, { emit }) {
    const displayCollectBtn = computed((): boolean => !props.plant.collected && props.plant.floweringStarted);
    const displayStartFloweringBtn = computed((): boolean => !props.plant.floweringStarted && !props.plant.collected);
    const displayStartCurringBtn = computed((): boolean => !!props.plant.collected && !props.plant.startCurringDate);

    console.log('collected', props.plant.collected);
    console.log('startCurringDate', props.plant.startCurringDate);

    watch(props.plant, (value) => {
      console.log(value.startCurringDate);
    });

    const weight = ref<number>(0);

    return {
      cutPlant: () => emit('cut-plant'),
      startFlowering: () => emit('start-flowering'),
      startCurring: () => emit('start-curring'),
      displayStartCurringBtn,
      displayCollectBtn,
      displayStartFloweringBtn,
      weight,
    };
  },
});
</script>
