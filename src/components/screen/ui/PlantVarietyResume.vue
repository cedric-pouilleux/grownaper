<template>
  <div class="plant-variety-resume" v-if="variety">
    <h2>
      <a v-if="variety.link" :href="variety.link">
        #{{ variety.phenotype}} {{ variety.title }} from {{ variety.breeder.title }}
        {{ variety.feminized && '- Feminized' }}
        {{ variety.automatic && '- Automatic' }}
      </a>
      <template v-else>
        #{{ variety.phenotype}} {{ variety.title }} from {{ variety.breeder.title }}
      </template>
    </h2>
  </div>
  <div v-else>
    No variety for this plant
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Variety } from '@/common/types';

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

<style lang="scss" scoped>
h2 {
  font-size: 1.2em;
  margin-bottom: 20px;
}
</style>
