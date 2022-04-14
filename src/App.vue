<template>
  <div class="common-layout">
    <el-menu router
             default-active="1"
             mode="horizontal"
             background-color="#ebebeb"
             text-color="#333"
             active-text-color="#ff0000">
      <el-menu-item index="/"> Home</el-menu-item>
      <el-menu-item index="/plants">Plants</el-menu-item>
      <el-menu-item v-if="loggedIng" index="/admin">Admin</el-menu-item>
      <el-menu-item v-if="loggedIng" index="/account">{{ $t('account') }}</el-menu-item>
      <el-menu-item v-else>
        <el-link href="http://localhost:3000/auth/google" target="_blank">{{ $t('connect') }}</el-link>
      </el-menu-item>
      <div class="menu-right-tools">
        <el-select v-model="$i18n.locale" size="small">
          <el-option label="French" value="fr-FR">
            <country-flag country='fr'/> France
          </el-option>
          <el-option label="English" value="en-US"/>
        </el-select>
      </div>
    </el-menu>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import UsersStore from '@/store/users';
import { storeToRefs } from 'pinia';
import Token from '@/api/Token';

export default defineComponent({
  name: 'App',
  setup() {
    const language = ref<string>('en');
    const userStore = UsersStore();
    const route = useRoute();

    const { loggedIng } = storeToRefs(userStore);

    if (route.query.token) {
      Token.setLocalToken(route.query.token);
    }

    return {
      loggedIng,
    };
  },
});
</script>

<style lang="scss">
@import "./styles/reset.scss";
@import "./styles/layout.scss";
.menu-right-tools {
  margin-left: auto;
  padding: 16px;
}
</style>
