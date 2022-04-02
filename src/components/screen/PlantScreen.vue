<template>
  <div class="plant-screen">
    <header>
      <el-row>
        <el-col :span="6">
          <h3>Created at : {{ readableCreatedAt }}</h3>
        </el-col>
        <el-col :span="18">
          <flowering-date-form :date="startFloweringDate"
                               :variety="plant.variety"
                               @change="startFloweringDateChange"
                               @save="editStartFloweringDate "/>
        </el-col>
      </el-row>
    </header>
    <el-tabs class="demo-tabs" v-model="activeName" type="card">
      <el-tab-pane label="Timing" name="timing">
        <plant-timing-resume :floTime="floTime"
                             :startFloweringDate="startFloweringDate"/>
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
  defineComponent, PropType, ref, watch,
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
  setup(props) {
    const activeName = ref('timing');

    const startFloweringDate = ref<Date | null>(null);
    const floTime = ref<number | null>(null);

    const plantStore = PlantStore();

    watch(() => props.plant, (value) => {
      startFloweringDate.value = value.startFloweringDate || null;
      floTime.value = value.variety?.floTime || null;
    }, { immediate: true });

    async function editStartFloweringDate() {
      const id = props.plant?._id;
      if (id && startFloweringDate.value) {
        const edited = await plantStore.editFloweringDate(id, startFloweringDate.value);
        if (edited) {
          ElNotification.success({
            message: `Plant(${id}) start flowering date has been edited`,
            offset: 100,
          });
        }
      }
    }

    function startFloweringDateChange(data: { date: Date, variety: Variety}): void {
      startFloweringDate.value = data.date;
      floTime.value = data.variety.floTime;
    }

    return {
      Plus,
      activeName,
      startFloweringDate,
      floTime,
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
