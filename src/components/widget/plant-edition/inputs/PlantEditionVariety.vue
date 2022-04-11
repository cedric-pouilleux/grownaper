<template>
  <el-form-item :label="$t('variety')" >
    <el-select v-model="selectedVariety" style="{ width: 100%; }"
               :placeholder="selectedVariety?.title || $t('your.plant')">
      <el-option v-for="optVariety in varietyStore.all"
                 :key="optVariety._id"
                 :value="optVariety">
        {{optVariety.title}}
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import {
  computed, defineComponent, WritableComputedRef,
} from 'vue';
import { object } from 'vue-types';
import VarietyStore from '@/store/varieties';
import { Variety } from '@/common/types';

export default defineComponent({
  name: 'PlantEditionVariety',
  props: {
    variety: object<Variety>().isRequired,
  },
  emits: ['update:variety'],
  setup(props, { emit }) {
    const varietyStore = VarietyStore();

    const selectedVariety: WritableComputedRef<Variety> = computed({
      get() {
        return props.variety;
      },
      set(value) {
        emit('update:variety', value);
      },
    });

    return {
      selectedVariety,
      varietyStore,
    };
  },
});
</script>
