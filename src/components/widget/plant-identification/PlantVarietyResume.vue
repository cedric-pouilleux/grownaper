<template>
  <span class="plant-variety-resume" v-if="variety">
    <a v-if="variety.link" :href="variety.link">
      #{{ variety.phenotype}} {{ variety.title }} from {{ variety.breeder.title }}
      {{ variety.feminized && '- Feminized' }}
      {{ variety.automatic && '- Automatic' }}
    </a>
    <template v-else>
      #{{ variety.phenotype}} {{ variety.title }} from {{ variety.breeder.title }}
    </template>
  </span>
  <span v-else>
    No variety for this plant
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Variety } from '@/common/types';

export default defineComponent({
  name: 'PlantVarietyResume',
  props: {
    variety: {
      type: Object as PropType<Variety>,
      required: true,
    },
  },
});
</script>
