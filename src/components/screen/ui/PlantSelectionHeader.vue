<template>
  <el-header class="view-header">
    <h2>
      {{ name }}
      {{flowering}}
      <plant-variety-resume :variety="variety" />
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
      <el-button v-if="collected"
                 disabled
                 type="success"
                 size="small"
                 @click="cutPlant"
                 round plain>
        Collected
      </el-button>
      <el-button v-if="!flowering && !collected"
                 type="success"
                 size="small"
                 @click="startFlowering"
                 round plain>
        Start flowering
      </el-button>
      <el-popconfirm title="Are you sure to delete this ?" @confirm="removePlant">
        <template #reference>
          <el-button size="small" type="danger" round>
            Remove
          </el-button>
        </template>
      </el-popconfirm>
    </div>
  </el-header>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import PlantVarietyResume from '@/components/screen/ui/PlantVarietyResume.vue';
import { Variety } from '@/common/types';

export default defineComponent({
  name: 'PlantSelectionHeader',
  components: { PlantVarietyResume },
  props: {
    name: {
      type: String,
      require: true,
    },
    variety: Object as PropType<Variety>,
    collected: {
      type: [String, Boolean],
      default: null,
    },
    flowering: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['remove', 'cut-plant', 'start-flowering'],
  setup(props, { emit }) {
    return {
      removePlant: () => emit('remove'),
      cutPlant: () => emit('cut-plant'),
      startFlowering: () => emit('start-flowering'),
      displayCollectBtn: computed(
        () => props.collected !== false && props.collected === null,
      ),
    };
  },
});
</script>
