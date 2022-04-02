<template>
  <div class="plant-timing-resume">
    <h3>Created at : {{ readableCreatedAt }}</h3>
      <el-row>
        <el-col :span="12">
          <div class="plant-timing-resume__flowering" v-if="plant.variety && startFloweringDate">
            <el-tag size="large" type="success">{{leaveDay}} Day leave</el-tag>
            <div class="plant-timing-resume__flowering-details">
              <p><span class="underline">Start flowering</span> {{ readableStartFloweringDate }}</p>
              <p><span class="underline">Cut date</span> {{cutDate}}</p>
              <p><span class="underline">Cut date average</span> {{averageCutDate}}</p>
            </div>
          </div>
          <div v-else>
            Variety is require for calculate cut date
          </div>
        </el-col>
        <el-col :span="12">
          <flowering-date-form :date="startFloweringDate"
                               @change="startFloweringDateChange"
                               @save="editStartFloweringDate "/>
          <el-progress v-if="percent > 0" :percentage="Math.round(percent)" />
          <el-alert v-else title="Not start flowering" type="error" :closable="false"/>
        </el-col>
      </el-row>
  </div>

</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref, watch,
} from 'vue';
import { Plant } from '@/types';
import Moment from 'moment';
import FloweringDateForm from '@/components/screen/form/FloweringDateForm.vue';
import PlantStore from '@/store/plants';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'PlantTimingResume',
  components: { FloweringDateForm },
  props: {
    plant: Object as PropType<Plant>,
  },
  setup(props) {
    const format = 'MM/DD/YYYY';
    const formatTime = 'dddd, MMMM Do YYYY, hh:mm';

    /**
     * Todo => Refacto behavior
     */
    const flowering = ref<number>(props.plant?.variety?.floTime || 0);
    const startFloweringDate = ref<Date | null>(null);
    const plantStore = PlantStore();

    watch(() => props.plant, (value) => {
      if (value?.variety) {
        flowering.value = value.variety.floTime;
      }
      startFloweringDate.value = value?.startFloweringDate || null;
    }, { immediate: true });

    const cutDate = computed(
      () => Moment(startFloweringDate.value).add(flowering.value, 'd').format(format),
    );

    const averageCutDate = computed(
      () => Moment(startFloweringDate.value).add(flowering.value + 10, 'd').format(format),
    );

    const leaveDay = computed(
      () => Moment(startFloweringDate.value).add(flowering.value, 'd').diff(Moment(), 'days'),
    );

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

    return {
      averageCutDate,
      cutDate,
      percent: computed(() => 100 - (leaveDay.value / flowering.value) * 100),
      readableCreatedAt: computed(() => Moment(props.plant?.createdAt).format(formatTime)),
      readableStartFloweringDate: computed(
        () => Moment(startFloweringDate.value).format(formatTime),
      ),
      leaveDay,
      startFloweringDate,
      startFloweringDateChange: (date: Date): void => { startFloweringDate.value = date; },
      editStartFloweringDate,
      Moment,
    };
  },
});
</script>

<style lang="scss" scoped>
.plant-timing-resume {

  h3 {
    font-weight: 700;
    font-size: 0.8em;
  }

  &__flowering {
    margin: 20px 0 20px 0;

    &-details {
      margin-top: 12px;
    }

    p {
      font-size: .9em;
      line-height: 26px;
    }
  }
}
</style>
