<template>
  <div class="plant-variety-resume" v-if="variety">
    <h2>Variety : {{ variety.title }}</h2>
    <p>Database ID : {{ variety._id }}</p>
    <p>unique slug : {{ variety.slug }}</p>
    <hr/>
    <p>Breeder : {{ variety.breeder.title }}
      <el-tag>{{ variety.breeder._id}}</el-tag>
    </p>
    <hr/>
    <p v-if="variety.feminized">Feminized</p>
    <p v-if="variety.automatic">Automatic</p>
    <p>Flowering time : {{ variety.floTime}}</p>
    <p>Phenotype : #{{ variety.phenotype}}</p>
    <p>Country : {{ variety.country}}</p>
    <p>Link : {{ variety.link }}</p>
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
});
</script>
