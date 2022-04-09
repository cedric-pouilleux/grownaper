<template>

  <span v-if="plant">

    <el-button v-if="displayGrowingStartBtn"
               type="warning"
               effect="plain"
               size="small"
               @click="startGrowing"
               round plain>
      Start growing
    </el-button>

    <el-button v-if="plant.isGrowing()" type="success" size="small" @click="startFlowering" round plain>
      Start flowering
    </el-button>

    <!-- Collect btn -->
    <el-popconfirm v-if="displayCollectStartBtn" title="Are you sure to collect this plant ?" @confirm="cutPlant">
      <template #reference>
        <el-button type="warning" effect="plain" size="small" round plain>
          Collect
        </el-button>
      </template>
    </el-popconfirm>

    <!-- Collected btn -->
    <el-button v-if="plant.isCurring() || plant.isDrying()"
               disabled type="success" size="small" @click="cutPlant" round plain>
      Collected
    </el-button>

    <!-- Start curring btn -->
    <el-popover trigger="hover" :width="185" v-if="plant.isDrying() && !plant.isCurring()">
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

  </span>

</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from 'vue';
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';
import PlantResource from '@/resources/PlantResource';

export default defineComponent({
  name: 'PlantSelectionHeader',
  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
  },
  emits: ['edit'],
  setup(props, { emit }) {
    const weight = ref<number>(0);
    const plantStore = PlantStore();

    async function startGrowing(): Promise<void> {
      if (!props.plant._id) {
        return;
      }
      const edited = await plantStore.startGrowing(props.plant._id);
      if (edited) {
        ElNotification.success({
          message: `PlantResource ${edited.name} start growing`,
          offset: 100,
        });
        emit('edit', edited);
      }
    }

    async function startCurring(): Promise<void> {
      if (!props.plant._id) {
        return;
      }
      const edited = await plantStore.startCurring(props.plant._id, weight.value);
      if (edited) {
        ElNotification.success({
          message: `PlantResource ${edited.name} start curring`,
          offset: 100,
        });
        emit('edit', edited);
      }
    }

    async function cutPlant(): Promise<void> {
      if (!props.plant._id) {
        return;
      }
      const edited = await plantStore.cut(props.plant._id);
      if (edited) {
        ElNotification.success({
          message: `PlantResource ${edited.name} has been cut`,
          offset: 100,
        });
        emit('edit', edited);
      }
    }

    async function startFlowering(): Promise<void> {
      if (!props.plant._id) {
        return;
      }
      const edited = await plantStore.startFlowering(props.plant._id);
      if (edited) {
        ElNotification.success({
          message: `PlantResource ${edited.name} start flowering`,
          offset: 100,
        });
        emit('edit', edited);
      }
    }

    const displayGrowingStartBtn = computed(() => {
      if (props.plant.collectedDate) {
        return false;
      }
      return !props.plant.isGrowing()
      && !props.plant.isFlowering()
      && !props.plant.isDrying()
      && !props.plant.isCurring();
    });

    const displayCollectStartBtn = computed(() => props.plant.isFlowering()
        && !props.plant.isDrying()
        && !props.plant.isGrowing()
        && !props.plant.isCurring());

    return {
      cutPlant,
      startFlowering,
      startCurring,
      startGrowing,
      displayGrowingStartBtn,
      displayCollectStartBtn,
      weight,
    };
  },
});
</script>
