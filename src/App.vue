<template>
  <div>
    <nav class="top-nabvar">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </nav>
    <el-button>I am ElButton</el-button>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./styles/reset.scss";
@import "./styles/layout.scss";
</style>
