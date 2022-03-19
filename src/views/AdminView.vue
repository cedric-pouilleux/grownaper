<template>
  <div class="grid">
    <div>
      <BreederForm :selected="selectedBreeder" @cancel="cancel"/>
    </div>
    <div>
      <BreedersList @edit="editBreeder"/>
    </div>
    <div>
    </div>
    <div>
      <VarietiesList/>
    </div>
  </div>
</template>

<script lang="ts">
import BreedersList from '@/components/BreedersList.vue';
import BreederForm from '@/components/BreederForm.vue';
import VarietiesList from '@/components/VarietiesList.vue';
import { defineComponent, ref } from 'vue';
import { Breeder } from '@/types';

export default defineComponent({
  name: 'AdminPage',
  components: {
    BreederForm,
    VarietiesList,
    BreedersList,
  },
  setup() {
    const selectedBreeder = ref<Breeder | null>(null);

    function editBreeder(value: any) {
      selectedBreeder.value = value;
    }

    function cancel() {
      selectedBreeder.value = null;
    }

    return {
      selectedBreeder,
      editBreeder,
      cancel,
    };
  },
});

</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0 10px;
  grid-template-areas:
    ". . ."
    ". . ."
    ". . .";
}
</style>
