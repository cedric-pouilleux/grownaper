<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu router mode="horizontal">
          <el-menu-item :index="{ name: 'Plants' }">Plants</el-menu-item>
          <el-menu-item :index="{ name: 'Admin' }">Admin</el-menu-item>
        </el-menu>
      </el-header>
      <router-view/>
    </el-container>
  </div>
</template>

<style lang="scss">
@import "./styles/reset.scss";
@import "./styles/layout.scss";
</style>
