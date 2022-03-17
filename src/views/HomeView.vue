<template>
  <div class="home">
    <PlantForm/>
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
import PlantForm from '@/components/PlantForm.vue';
import VarietiesList from '@/components/VarietiesList.vue';
import VarietyForm from '@/components/VarietyForm.vue';
import PlantList from '@/components/PlantList.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    PlantList,
    VarietyForm,
    VarietiesList,
    PlantForm,
    BreedersList,
    BreederForm,
  },
});
</script>
