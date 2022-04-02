<template>
  <div class="plant-screen">
    <header>
      <el-row>
        <el-col :span="6">
          <h3>Created at : {{ readableCreatedAt }}</h3>
        </el-col>
        <el-col :span="18">
          <flowering-date-form :date="selectedPlant.startFloweringDate"
                               :variety="selectedPlant.variety"
                               @change="startFloweringDateChange"
                               @save="editStartFloweringDate "/>
        </el-col>
      </el-row>
    </header>
    <el-tabs class="demo-tabs" v-model="activeName" type="card">
      <el-tab-pane label="Timing" name="timing">
        <plant-timing-resume :floTime="selectedPlant.variety?.floTime"
                             :startFloweringDate="selectedPlant.startFloweringDate"/>
      </el-tab-pane>
      <el-tab-pane label="Variety" name="variety">
        <plant-variety-resume :variety="plant.variety" />
      </el-tab-pane>
      <el-tab-pane label="Identification" name="identification">
        <plant-identification-resume :qrcode="plant.qrcode" :database-id="plant._id" />
      </el-tab-pane>
      <el-tab-pane label="Notes" name="notes">
        <plant-notes-resume />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref, watch, toRef, reactive,
} from 'vue';
import { Plant, Variety } from '@/common/types';
import { Plus } from '@element-plus/icons-vue';
import PlantVarietyResume from '@/components/screen/ui/PlantVarietyResume.vue';
import PlantIdentificationResume from '@/components/screen/ui/PlantIdentificationResume.vue';
import PlantTimingResume from '@/components/screen/ui/PlantTimingResume.vue';
import PlantNotesResume from '@/components/screen/ui/PlantNotesResume.vue';
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';
import FloweringDateForm from '@/components/screen/form/FloweringDateForm.vue';
import Moment from 'moment';
import { READABLE_DATE } from '@/common/DateFormatConfig';

export default defineComponent({
  name: 'PlantScreen',
  components: {
    PlantNotesResume,
    PlantTimingResume,
    PlantIdentificationResume,
    PlantVarietyResume,
    FloweringDateForm,
  },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  emits: ['change'],
  setup(props) {
    const activeName = ref('timing');
    const plantStore = PlantStore();

    const initial: Partial<Plant> = {};
    Object.assign(initial, props.plant);

    const plant = toRef(props, 'plant');

    const selectedPlant = reactive<Plant>({ ...props.plant });

    async function editStartFloweringDate(): Promise<boolean> {
      // eslint-disable-next-line max-len
      const isEqual = (...objects: any) => objects.every((obj: any) => JSON.stringify(obj) === JSON.stringify(objects[0]));
      const isVarietyEqual = isEqual(initial.variety, selectedPlant.variety);
      const isFloweringDateEqual = Moment(initial.startFloweringDate).isSame(selectedPlant.startFloweringDate, 'day');
      if (isVarietyEqual && isFloweringDateEqual) {
        return false;
      }
      const edited = await plantStore.edit(props.plant._id, {
        startFloweringDate: selectedPlant.startFloweringDate || null,
        variety: selectedPlant.variety || null,
      });
      Object.assign(initial, selectedPlant);
      if (edited) {
        ElNotification.success({
          message: `Plant(${props.plant._id}) start flowering date has been edited`,
        });
      }
      return true;
    }

    function startFloweringDateChange(data: { date: Date, variety: Variety}): void {
      selectedPlant.startFloweringDate = data.date;
      selectedPlant.variety = data.variety;
    }

    return {
      Plus,
      selectedPlant,
      activeName,
      initial,
      readableCreatedAt: computed(() => Moment(props.plant.createdAt).format(READABLE_DATE)),
      startFloweringDateChange,
      editStartFloweringDate,
    };
  },
});
</script>

<style scoped lang="scss">
.plant-screen {
  h3 {
    font-weight: 700;
    font-size: 0.8em;
  }
  &__section {
    padding: 12px;
    width: 100%;
  }
}
</style>
