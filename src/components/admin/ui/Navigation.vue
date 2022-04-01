<template>
  <el-menu router
           mode="horizontal"
           background-color="#333"
           text-color="#fff"
           active-text-color="#ff0000">
    <el-menu-item index="/admin/varieties">Varieties & Breeders</el-menu-item>
    <el-menu-item index="/admin/feeders">Feeders & Products</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminUiNavigation',
});
</script>
