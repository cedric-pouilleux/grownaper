<template>
  <div class="grid">
    <div>
      <BreederForm :selected="selectedBreeder"
                   @cancel="cancelBreederSelection"/>
    </div>
    <div>
      <BreedersList @edit="editBreeder"/>
    </div>
    <div>
      <VarietyForm :selected="selectedVariety"
                   @cancel="cancelVarietySelection"/>
      <VarietiesList @edit="editVariety"/>
    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts">
import BreedersList from '@/components/BreedersList.vue';
import BreederForm from '@/components/BreederForm.vue';
import VarietiesList from '@/components/VarietiesList.vue';
import { defineComponent, ref } from 'vue';
import { Breeder, Variety } from '@/types';
import VarietyForm from '@/components/VarietyForm.vue';

export default defineComponent({
  name: 'AdminPage',
  components: {
    VarietyForm,
    BreederForm,
    VarietiesList,
    BreedersList,
  },
  setup() {
    const selectedBreeder = ref<Breeder | null>(null);
    const selectedVariety = ref<Variety | null>(null);

    function editBreeder(breeder: Breeder) {
      selectedBreeder.value = breeder;
    }

    function editVariety(variety: Variety) {
      selectedVariety.value = variety;
    }

    function cancel() {
      selectedBreeder.value = null;
    }

    return {
      selectedBreeder,
      selectedVariety,
      editBreeder,
      editVariety,
      cancelBreederSelection: () => { selectedBreeder.value = null; },
      cancelVarietySelection: () => { selectedVariety.value = null; },
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
