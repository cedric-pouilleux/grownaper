<template>
  <div class="grid">
    <div>
      <BreederForm :selected="selectedBreeder" @cancel="cancelBreederSelection"/>
      <BreedersList @edit="editBreeder"/>
    </div>
    <div>
      <VarietyForm :selected="selectedVariety" @cancel="cancelVarietySelection"/>
      <VarietiesList @edit="editVariety"/>
    </div>
    <div>
      <FeederForm :selected="selectedFeeder" @cancel="cancelFeederSelection"/>
      <FeederList @edit="editFeeder"/>
    </div>
  </div>
</template>

<script lang="ts">
import BreedersList from '@/components/BreedersList.vue';
import BreederForm from '@/components/BreederForm.vue';
import VarietiesList from '@/components/VarietiesList.vue';
import { defineComponent, ref } from 'vue';
import { Breeder, Feeder, Variety } from '@/types';
import VarietyForm from '@/components/VarietyForm.vue';
import FeederForm from '@/components/FeederForm.vue';
import FeederList from '@/components/FeederList.vue';

export default defineComponent({
  name: 'AdminPage',
  components: {
    FeederList,
    FeederForm,
    VarietyForm,
    BreederForm,
    VarietiesList,
    BreedersList,
  },
  setup() {
    const selectedBreeder = ref<Breeder | null>(null);
    const selectedVariety = ref<Variety | null>(null);
    const selectedFeeder = ref<Feeder | null>(null);

    function editBreeder(breeder: Breeder): void {
      selectedBreeder.value = breeder;
    }

    function editVariety(variety: Variety): void {
      selectedVariety.value = variety;
    }

    function editFeeder(feeder: Feeder): void {
      selectedFeeder.value = feeder;
    }

    function cancel() {
      selectedBreeder.value = null;
    }

    return {
      selectedBreeder,
      selectedVariety,
      selectedFeeder,
      editBreeder,
      editVariety,
      editFeeder,
      cancelBreederSelection: () => { selectedBreeder.value = null; },
      cancelVarietySelection: () => { selectedVariety.value = null; },
      cancelFeederSelection: () => { selectedFeeder.value = null; },
      cancel,
    };
  },
});

</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 10px;
  grid-template-areas:
    ". ."
    ". ."
    ". .";
}
</style>
