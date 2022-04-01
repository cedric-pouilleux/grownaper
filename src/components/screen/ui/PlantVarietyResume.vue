<template>
  <h2>Variety : {{ title }}</h2>
  <div v-if="variety">
    <p>Database ID : {{ variety._id }}</p>
    <p>unique slug : {{ variety.slug }}</p>
    <hr/>
    <p>Breeder : {{ breeder.title }}
      <el-tag>{{ breeder._id}}</el-tag>
    </p>
    <hr/>
    <p v-if="feminized">Feminized</p>
    <p v-if="automatic">Automatic</p>
    <p>Flowering time : {{ floTime}}</p>
    <p>Phenotype : #{{ phenotype}}</p>
    <p>Country : {{ country}}</p>
    <p>Link : {{ link }}</p>
  </div>
  <div v-else>
    No variety for this plant
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, toRefs,
} from 'vue';
import { Variety } from '@/types';

export default defineComponent({
  name: 'PlantVariety',
  props: {
    variety: {
      type: Object as PropType<Variety>,
      required: true,
    },
  },
  setup(props) {
    return {
      ...toRefs(props.variety),
    };
  },
});
</script>
