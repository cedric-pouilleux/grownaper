<template>
  <div class="grid">
    <div>
      <BreedersList/>
    </div>
    <div>
      <VarietiesList/>
    </div>
  </div>
</template>

<script lang="ts">
import BreedersList from '@/components/BreedersList.vue';
import VarietiesList from '@/components/VarietiesList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminPage',
  components: {
    VarietiesList,
    BreedersList,
  },
});

</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . ."
    ". . ."
    ". . .";
}
</style>
