<template>
  <div class="plant-identification-resume">
    <el-row :gutter="20" v-if="plant.qrcode && plant._id">
      <el-col :span="8">
        <qrcode-vue :value="plant.qrcode" style="width: 100%; height: auto;" :size="450"/>
      </el-col>
      <el-col :span="16">
        <h3>Created at : {{ readableCreatedAt }}</h3>
        <p style="font-size: 11px">{{ plant._id }}</p>
        <br/>
        <el-button size="small"
                   @click="editPlant"
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

export default defineComponent({
  name: 'PlantIdentification',
  components: {
    QrcodeVue,
  },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  emits: ['remove-plant', 'edit-plant'],
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

    return {
      readableCreatedAt,
      removePlant,
      editPlant: () => emit('edit-plant'),
    };
  },
});
</script>

<style lang="scss" scoped>
.plant-identification-resume {
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
