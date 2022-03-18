<template>
  <div class="admin">
    <BreedersList/>
    <VarietiesList/>
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
