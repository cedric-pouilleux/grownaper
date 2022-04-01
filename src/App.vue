<template>
  <div class="common-layout">
    <el-menu router
             default-active="1"
             mode="horizontal"
             background-color="#ebebeb"
             text-color="#333"
             active-text-color="#ff0000">
      <el-menu-item index="/">Plants</el-menu-item>
      <el-menu-item index="/admin">Admin</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
@import "./styles/reset.scss";
@import "./styles/layout.scss";
</style>
