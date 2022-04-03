<template>
  <div class="plant-screen">
    <el-tabs class="demo-tabs" v-model="activeName" type="card">
      <el-tab-pane label="Notes" name="notes">
        <plant-notes-resume />
      </el-tab-pane>
      <el-tab-pane label="Edit" name="edit">
        <flowering-date-form :plant="plant"
                             @change="startFloweringDateChange"
                             @save="editStartFloweringDate"
                             :visible-button="!sameVariety || !sameDate"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref, reactive, toRef,
} from 'vue';
import { Plant } from '@/common/types';
import { Plus } from '@element-plus/icons-vue';
import PlantNotesResume from '@/components/screen/ui/PlantNotesResume.vue';
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';
import FloweringDateForm from '@/components/screen/form/FloweringDateForm.vue';
import Moment from 'moment';
import { isEqual } from '@/common/utils';

export default defineComponent({
  name: 'PlantScreen',
  components: {
    PlantNotesResume,
    FloweringDateForm,
  },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const activeName = ref('timing');
    const plantStore = PlantStore();

    const initial: Partial<Plant> = {};

    const propsPlant = toRef(props, 'plant');

    Object.assign(initial, propsPlant.value);

    const selectedPlant = reactive<Plant>({ ...propsPlant.value });
    const startFloweringDateRef = toRef(props.plant, 'startFloweringDate');
    const varietyRef = toRef(props.plant, 'variety');

    const sameDate = computed(() => Moment(initial.startFloweringDate).isSame(selectedPlant.startFloweringDate, 'day'));

    const sameVariety = computed(() => isEqual(initial.variety, selectedPlant.variety));

    async function editStartFloweringDate(): Promise<boolean> {
      if (sameDate.value && sameVariety.value) {
        return false;
      }
      const params = {
        ...(!sameDate.value) && { startFloweringDate: selectedPlant.startFloweringDate },
        ...(!sameVariety.value) && { variety: selectedPlant.variety },
      };
      const edited = await plantStore.edit(propsPlant.value._id, params);
      if (edited) {
        Object.assign(initial, selectedPlant);
        ElNotification.success({
          message: `Plant(${propsPlant.value._id}) start flowering date has been edited`,
        });
      }
      console.log(edited);
      emit('change', edited);
      return true;
    }

    function startFloweringDateChange(plant: Plant): void {
      Object.assign(selectedPlant, plant);
      emit('change', selectedPlant);
    }

    return {
      Plus,
      startFloweringDateRef,
      varietyRef,
      selectedPlant,
      activeName,
      initial,
      startFloweringDateChange,
      editStartFloweringDate,
      sameDate,
      sameVariety,
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
