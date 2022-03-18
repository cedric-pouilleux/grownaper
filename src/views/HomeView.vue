<template>
  <div class="home">
    <PlantList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlantList from '@/components/PlantList.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantList,
  },
});
</script>
