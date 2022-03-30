<template>

  <el-menu router
           mode="horizontal"
           background-color="#333"
           text-color="#fff"
           active-text-color="#ff0000">
    <el-menu-item :index="{ name: 'AdminVarieties' }">Varieties & Breeders</el-menu-item>
    <el-menu-item :index="{ name: 'AdminFeeders' }">Feeders & Products</el-menu-item>
  </el-menu>

  <el-container>
    <el-aside width="400px">
    </el-aside>
    <el-main>
    </el-main>
  </el-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminFeedersView',
});
</script>

<style lang="scss" scoped>
</style>
