<template>
  <el-form-item :label="$t('name')" >
    <el-input type="text"
              v-model="selectedName"
              clearable
              style="{ width: 100%; }">
      <template #append>
        <el-button type="primary" @click="refreshName">
          {{ $t('randomise') }}
        </el-button>
      </template>
    </el-input>
  </el-form-item>
</template>

<script lang="ts">
import {
  computed, defineComponent, WritableComputedRef,
} from 'vue';
import NameGenerator from '@/common/NameGenerator';
import { string } from 'vue-types';

export default defineComponent({
  name: 'PlantEditionName',
  props: {
    name: string().isRequired,
  },
  emits: ['update:name'],
  setup(props, { emit }) {
    const selectedName: WritableComputedRef<string> = computed({
      get() {
        return props.name;
      },
      set(value) {
        emit('update:name', value);
      },
    });

    function refreshName() {
      emit('update:name', NameGenerator.generateName());
    }

    return {
      refreshName,
      selectedName,
    };
  },
});
</script>
