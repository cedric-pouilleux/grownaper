<template>
  <div class="home">
    <BreederForm/>
    <BreedersList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BreederForm from '@/components/BreederForm.vue';
import BreedersList from '@/components/BreedersList.vue';

export default defineComponent({
  name: 'HomePage',
  components: { BreedersList, BreederForm },
});
</script>
