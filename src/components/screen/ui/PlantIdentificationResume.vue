<template>
  <div class="plant-identification-resume">
    <header class="plant-identification-resume__header">
      <qrcode-vue :value="plant.qrcode" style="width: 60px; height: 60px;" :size="200"/>
      <div>
        <h1 :data-plantid="plant._id">{{ plant.name }}</h1>
        <plant-variety-resume :variety="plant.variety" />
        <p class="date">Created at : {{ readableCreatedAt }}</p>
        <el-button size="small"
                   @click="openEditPlant"
                   plain round>
          Edit
        </el-button>
        <el-popconfirm title="Are you sure to delete this ?"
                       @confirm="removePlant">
          <template #reference>
            <el-button size="small" type="danger" plain round>
              Delete
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </header>
    <el-row :gutter="20" v-if="plant.qrcode && plant._id">
      <el-col :span="8">
          <plant-selection-header :plant="plant" @edit="editStatusPlant"/>
      </el-col>
      <el-col :span="16">
        <br/>
      </el-col>
    </el-row>
    <div v-else>
      No identification possible
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import QrcodeVue from 'qrcode.vue';
import Moment from 'moment';
import { SIMPLE_DATE } from '@/common/DateFormatConfig';
import { Plant } from '@/common/types';
import PlantStore from '@/store/plants';
import PlantVarietyResume from '@/components/screen/ui/PlantVarietyResume.vue';
import PlantSelectionHeader from '@/components/screen/ui/PlantSelectionHeader.vue';

export default defineComponent({
  name: 'PlantIdentification',
  components: {
    QrcodeVue,
    PlantVarietyResume,
    PlantSelectionHeader,
  },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  emits: ['remove-plant', 'open-edit-plant', 'edit-status-plant'],
  setup(props, { emit }) {
    const plantStore = PlantStore();

    const readableCreatedAt = computed((): string | null => {
      if (props.plant?.createdAt) {
        return Moment(props.plant.createdAt).format(SIMPLE_DATE);
      }
      return null;
    });

    async function removePlant(): Promise<void> {
      await plantStore.remove(props.plant._id);
      emit('remove-plant');
    }

    function editStatusPlant(plant: Plant) {
      emit('edit-status-plant', plant);
    }

    return {
      readableCreatedAt,
      removePlant,
      editStatusPlant,
      openEditPlant: () => emit('open-edit-plant'),
    };
  },
});
</script>

<style lang="scss" scoped>
.plant-identification-resume {

  &__header {
    display: flex;
    canvas {
      margin-right: 12px;
    }

    .date {
      margin: 6px 0;
      font-size: .7em;
    }
  }

  h1 {
    font-size: 1.4em;
    margin-bottom: 6px;
  }

  padding: 10px;
  h2 {
    font-size: 1.2em;
    text-align: center;
    width: 100%;
    padding: 18px 0;
  }
  h3 {
    font-weight: 700;
    font-size: 0.8em;
    margin-bottom: 12px;
  }
  &__qrcode-link {
    margin-top: 10px;
    word-break: break-all;
    line-height: 20px;
    font-size: 0.8em;
  }
}
</style>
