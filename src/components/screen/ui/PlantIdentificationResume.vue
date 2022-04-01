<template>
  <div class="plant-identification-resume">
    <h2>Identification</h2>
    <el-row :gutter="20" v-if="qrcode && databaseId">
      <el-col :span="8">
        <qrcode-vue :value="qrcode" :size="150"/>
      </el-col>
      <el-col :span="16">
        Database id <el-tag>{{ databaseId }}</el-tag>
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
import { defineComponent } from 'vue';
import QrcodeVue from 'qrcode.vue';

export default defineComponent({
  name: 'PlantIdentification',
  components: {
    QrcodeVue,
  },
  props: {
    qrcode: String,
    databaseId: String,
  },
});
</script>

<style lang="scss" scoped>
.plant-identification-resume {
  h2 {
    font-size: 1.2em;
    text-align: center;
    width: 100%;
    padding: 18px 0;
  }
  &__qrcode-link {
    margin-top: 10px;
    word-break: break-all;
    line-height: 20px;
    font-size: 0.8em;
  }
}
</style>
