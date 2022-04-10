<template>

  <span v-if="plant">

    <!-- Growing btn -->
    <el-button v-if="displayGrowingStartBtn"
               type="warning"
               effect="plain"
               size="small"
               @click="startGrowing"
               round plain
               data-testid="growing">
      Start growing
    </el-button>

    <!-- Flowering btn -->
    <el-button v-if="displayFloweringStartBtn"
               type="success"
               size="small"
               @click="startFlowering"
               data-testid="flowering"
               round plain>
      Start flowering
    </el-button>

    <!-- Collect btn -->
    <el-popconfirm v-if="displayCollectStartBtn"
                   title="Are you sure to collect this plant ?"
                   @confirm="cutPlant"
                   data-testid="collect">
      <template #reference>
        <el-button type="warning" effect="plain" size="small" round plain>
          Collect
        </el-button>
      </template>
    </el-popconfirm>

    <!-- Start curring btn -->
    <el-popover trigger="hover"
                :width="185"
                v-if="plant.isDrying() && !plant.isCurring()"
                data-testid="curring">
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
  computed, ComputedRef, defineComponent, ref,
} from 'vue';
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';
import PlantResource from '@/resources/PlantResource';
import Moment from 'moment';

export default defineComponent({
  name: 'PlantStatusAction',
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
    const currentDate = ref(Moment());

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
      if (props.plant.startFloweringDate) {
        return false;
      }
      if (props.plant.startGrowingDate) {
        return currentDate.value.isBefore(props.plant.startGrowingDate, 'd');
      }
      return true;
    });

    const displayCollectStartBtn: ComputedRef<boolean> = computed((): boolean => props.plant.isFlowering());

    const displayFloweringStartBtn: ComputedRef<boolean> = computed((): boolean => {
      if (props.plant.startFloweringDate) {
        return currentDate.value.isBefore(props.plant.startFloweringDate, 'd');
      }
      return true;
    });

    return {
      cutPlant,
      currentDate,
      startFlowering,
      startCurring,
      startGrowing,
      displayGrowingStartBtn,
      displayCollectStartBtn,
      displayFloweringStartBtn,
      weight,
    };
  },
});
</script>
