<template>
  <div class="common-layout">
    <nav-bar/>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import 'floating-vue/dist/style.css';
import NavBar from '@/components/layout/NavBar.vue';

export default defineComponent({
  name: 'App',
  components: { NavBar },
  setup() {
    const language = ref<string>('en');

    return {
    };
  },
});
</script>

<style lang="scss">
@import "./styles/reset.scss";
@import "./styles/layout.scss";
</style>
