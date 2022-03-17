<template>
  <div class="home">
    <PlantForm/>
    <VarietyForm/>
    <BreederForm/>
    <BreedersList/>
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

export default defineComponent({
  name: 'HomePage',
  components: {
    VarietyForm,
    VarietiesList,
    PlantForm,
    BreedersList,
    BreederForm,
  },
});
</script>
