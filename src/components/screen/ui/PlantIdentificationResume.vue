<template>
  <div class="plant-identification-resume">
    <el-row :gutter="20" v-if="qrcode && databaseId">
      <el-col :span="8">
        <qrcode-vue :value="qrcode" style="width: 100%; height: auto;" :size="450"/>
      </el-col>
      <el-col :span="16">
        <h3>Created at : {{ readableCreatedAt }}</h3>
        <p style="font-size: 11px">{{ databaseId }}</p>
        <hr/>
        <p class="plant-identification-resume__qrcode-link">{{ qrcode }}</p>
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
import { READABLE_DATE } from '@/common/DateFormatConfig';
import { Variety } from '@/common/types';

export default defineComponent({
  name: 'PlantIdentification',
  components: {
    QrcodeVue,
  },
  props: {
    qrcode: String,
    databaseId: String,
    createdAt: Date,
    variety: Object as PropType<Variety>,
  },
  setup(props) {
    return {
      readableCreatedAt: computed(() => Moment(props.createdAt).format(READABLE_DATE)),
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
