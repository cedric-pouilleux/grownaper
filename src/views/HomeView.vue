<template>
  <div class="home">
    <VarietyForm/>
    <BreederForm/>
    <BreedersList/>
    <PlantList/>
    <VarietiesList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BreederForm from '@/components/BreederForm.vue';
import BreedersList from '@/components/BreedersList.vue';
import VarietiesList from '@/components/VarietiesList.vue';
import VarietyForm from '@/components/VarietyForm.vue';
import PlantList from '@/components/PlantList.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantList,
    VarietyForm,
    VarietiesList,
    BreedersList,
    BreederForm,
  },
});
</script>
