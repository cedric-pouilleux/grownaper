<template>
  <el-header class="view-header">
    <div class="view-header__tools">

      {{plant.weight}}

      <!-- Collect btn -->
      <el-popconfirm v-if="displayCollectBtn" title="Are you sure to collect this plant ?" @confirm="cutPlant">
        <template #reference>
          <el-button type="warning" effect="plain" size="small" round plain>
            Collect
          </el-button>
        </template>
      </el-popconfirm>

      <!-- Collected btn -->
      <el-button v-if="plant.collected" disabled type="success" size="small" @click="cutPlant" round plain>
        Collected
      </el-button>

      <!-- Start curring btn -->
      <el-popover trigger="hover" :width="185" v-if="displayStartCurringBtn">
        <template #reference>
          <el-button type="warning" size="small" round plain>
            Start curring
          </el-button>
        </template>
        <el-input size="small" style="width: 120px;" type="text" v-model.number="weight">
          <template #append>gr</template>
        </el-input>
        <el-button size="small" type="warning" plain @click="startCurring" style="margin-left: 12px;">
          Send
        </el-button>
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
import { Plant } from '@/common/types';
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'PlantSelectionHeader',
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  emits: ['edit'],
  setup(props, { emit }) {
    const weight = ref<number>(0);
    const plantStore = PlantStore();

    const displayCollectBtn = computed((): boolean => !props.plant.collected && props.plant.floweringStarted);
    const displayStartFloweringBtn = computed((): boolean => !props.plant.floweringStarted && !props.plant.collected);
    const displayStartCurringBtn = computed((): boolean => !!props.plant.collected && !props.plant.startCurringDate);

    async function startCurring(): Promise<void> {
      const edited = await plantStore.startCurring(props.plant._id, weight.value);
      if (edited) {
        ElNotification.success({
          message: `Plant ${edited.name} start curring`,
          offset: 100,
        });
        emit('edit', edited);
      }
    }

    async function cutPlant(): Promise<void> {
      const edited = await plantStore.cut(props.plant._id);
      if (edited) {
        ElNotification.success({
          message: `Plant ${edited.name} has been cut`,
          offset: 100,
        });
        emit('edit', edited);
      }
    }

    async function startFlowering(): Promise<void> {
      const edited = await plantStore.startFlowering(props.plant._id);
      if (edited) {
        ElNotification.success({
          message: `Plant ${edited.name} start flowering`,
          offset: 100,
        });
        emit('edit', edited);
      }
    }

    return {
      cutPlant,
      startFlowering,
      startCurring,
      displayStartCurringBtn,
      displayCollectBtn,
      displayStartFloweringBtn,
      weight,
    };
  },
});
</script>
