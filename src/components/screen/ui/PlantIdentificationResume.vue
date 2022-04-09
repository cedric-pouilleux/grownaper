<template>
  <div class="plant-identification-resume">
    <header class="plant-identification-resume__header">
      <qrcode-vue :value="plant.qrcode" style="width: 60px; height: 60px;" :size="200"/>
      <div>
        <div class="plant-identification-resume__header-title">
          <h1 :data-plantid="plant._id">{{ plant.name }}</h1>
          <el-tag v-if="plant.collectedDate" type="success">Collected</el-tag>
        </div>
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import QrcodeVue from 'qrcode.vue';
import Moment from 'moment';
import { SIMPLE_DATE } from '@/common/DateFormatConfig';
import PlantStore from '@/store/plants';
import PlantVarietyResume from '@/components/screen/ui/PlantVarietyResume.vue';
import PlantResource from '@/resources/PlantResource';

export default defineComponent({
  name: 'PlantIdentification',
  components: {
    QrcodeVue,
    PlantVarietyResume,
  },
  props: {
    plant: {
      type: PlantResource,
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
      if (!props.plant._id) {
        return;
      }
      await plantStore.remove(props.plant._id);
      emit('remove-plant');
    }

    function editStatusPlant(plant: PlantResource) {
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
      margin: 6px 0 12px 0;
      font-size: .7em;
    }

    &-title {
      display: flex;
      margin-bottom: 12px;
      column-gap: 10px;
      align-content: baseline;
      justify-content: space-between;
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
