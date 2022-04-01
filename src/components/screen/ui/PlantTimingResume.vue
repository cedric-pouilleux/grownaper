<template>
  <h2>Timing</h2>
  <template v-if="plant.variety">
    {{leave}} Day leave
    <p>Start date : {{created}}</p>
    <p>Cut date : {{cut}}</p>
    <p>Cut date average : {{average}}</p>
    <el-progress :text-inside="true"
                 :stroke-width="24"
                 :percentage="Math.round(percent)" />
  </template>
  <template v-else>
    Variety is require for calculate cut date
  </template>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref, watch,
} from 'vue';
import { Plant } from '@/types';
import Moment from 'moment';

export default defineComponent({
  name: 'PlantTimingResume',
  props: {
    floweringTime: Number,
    createdAd: String,
    plant: Object as PropType<Plant>,
  },
  setup(props) {
    const format = 'MM/DD/YYYY';

    /**
     * Todo => Refacto behavior
     */
    const flowering = ref<number>(props.plant.variety?.floTime || 0);
    const leave = ref<number>(Moment(props.plant.createdAt).add(flowering.value, 'd').diff(Moment(), 'days'));
    const created = ref(Moment(props.plant.createdAt));

    watch(() => props.plant, (value) => {
      if (value.variety) {
        flowering.value = value.variety.floTime;
      }
      created.value = Moment(value.createdAt);
      leave.value = created.value.add(flowering.value, 'd').diff(Moment(), 'days');
    }, { immediate: true });

    return {
      created: computed(() => created.value.format(format)),
      average: computed(() => created.value.add(flowering.value + 10, 'd').format(format)),
      cut: computed(() => created.value.add(flowering.value, 'd').format(format)),
      percent: computed(() => 100 - (leave.value / flowering.value) * 100),
      leave,
    };
  },
});
</script>
