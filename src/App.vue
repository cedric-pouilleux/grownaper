<template>
  <div class="common-layout">
    <el-menu router
             default-active="1"
             mode="horizontal"
             background-color="#ebebeb"
             text-color="#333"
             active-text-color="#ff0000">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/plants">Plants</el-menu-item>
      <el-menu-item index="/admin">Admin</el-menu-item>
      <div class="languages">
        <el-select v-model="$i18n.locale" size="small">
          <el-option label="French" value="fr-FR"/>
          <el-option label="English" value="en-US"/>
        </el-select>
      </div>
    </el-menu>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const language = ref<string>('en');
    return {
      language,
    };
  },
});
</script>

<style lang="scss">
@import "./styles/reset.scss";
@import "./styles/layout.scss";
.languages {
  margin-left: auto;
  padding: 16px;
}
</style>
