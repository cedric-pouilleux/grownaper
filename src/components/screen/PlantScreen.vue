<template>
  <el-row class="plant-screen">
    <section class="plant-screen__section">
      <el-row :gutter="20">
        <el-col :span="12">
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
        </el-col>
        <el-col :span="12">
          <h2>Variety : {{ plant.variety.title}}</h2>
          <div v-if="plant.variety">
            <p>Database ID : {{ plant.variety._id}}</p>
            <p>unique slug : {{ plant.variety.slug}}</p>
            <hr/>
            <p>Breeder : {{ plant.variety.breeder.title }}
              <el-tag>{{ plant.variety.breeder._id}}</el-tag>
            </p>
            <hr/>
            <p v-if="plant.variety.feminized">Feminized</p>
            <p v-if="plant.variety.automatic">Automatic</p>
            <p>Flowering time : {{ plant.variety.floTime}}</p>
            <p>Phenotype : #{{ plant.variety.phenotype}}</p>
            <p>Country : {{ plant.variety.country}}</p>
            <p>Link : {{ plant.variety.link }}</p>
          </div>
          <div v-else>
            No variety for this plant
          </div>
        </el-col>
      </el-row>
    </section>

    <section class="plant-screen__section">
      <h2>Identification</h2>
      <el-row :gutter="20">
        <el-col :span="8">
          <qrcode-vue :value="plant.qrcode" :size="150"/>
        </el-col>
        <el-col :span="16">
          Database id <el-tag>{{plant._id}}</el-tag>
          <hr/>
          <p class="word">{{ plant.qrcode }}</p>
        </el-col>
      </el-row>
    </section>

  </el-row>
</template>
<script lang="ts">
import {
  defineComponent, ref, computed, watch, PropType,
} from 'vue';
import { Plant } from '@/types';
import QrcodeVue from 'qrcode.vue';
import Moment from 'moment';

export default defineComponent({
  name: 'PlantScreen',
  components: {
    QrcodeVue,
  },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  setup(props) {
    const format = 'MM/DD/YYYY';
    const flowering = ref<number>(props.plant.variety?.floTime || 0);
    const leave = ref<number>(Moment(props.plant.createdAt).add(flowering.value, 'd').diff(Moment(), 'days'));
    const leaveRef = ref<number>(leave.value);
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

<style scoped lang="scss">
.plant-screen {
  .word {
    margin-top: 10px;
    word-break: break-all;
    line-height: 20px;
    font-size: 0.8em;
  }
  h2 {
    font-size: 1.2em;
    text-align: center;
    width: 100%;
    padding: 18px 0;
  }

  &__section {
    padding: 12px;
    width: 100%;
  }
}
</style>
