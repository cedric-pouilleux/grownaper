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
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'PlantSelectionHeader',
  components: { PlantVarietyResume },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  emits: ['edit'],
  setup(props, { emit }) {
    const displayCollectBtn = computed((): boolean => !props.plant.collected && props.plant.floweringStarted);
    const displayStartFloweringBtn = computed((): boolean => !props.plant.floweringStarted && !props.plant.collected);
    const displayStartCurringBtn = computed((): boolean => !!props.plant.collected && !props.plant.startCurringDate);

    const plantStore = PlantStore();

    console.log('collected', props.plant.collected);
    console.log('startCurringDate', props.plant.startCurringDate);

    watch(props.plant, (value) => {
      console.log(value.startCurringDate);
    });

    const weight = ref<number>(0);

    async function startCurring(): Promise<void> {
      const edited = await plantStore.startCurring(props.plant._id);
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
