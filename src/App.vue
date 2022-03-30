<template>
  <div class="common-layout">
    <el-menu router
             :default-active="1"
             mode="horizontal"
             background-color="#ebebeb"
             text-color="#333"
             active-text-color="#ff0000">
      <el-menu-item :index="{ name: 'Plants' }">Plants</el-menu-item>
      <el-menu-item :index="{ name: 'Admin' }">Admin</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./styles/reset.scss";
@import "./styles/layout.scss";
</style>
