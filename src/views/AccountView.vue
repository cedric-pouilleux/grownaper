<template>
  <el-avatar :src="identity.photos[0].value"/>
  <p>{{ identity.emails[0].value}}</p>
  <p>{{ $d(identity.createdAt, 'long')}}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UsersStore from '@/store/users';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'AccountView',
  setup() {
    const userStore = UsersStore();
    const { identity } = storeToRefs(userStore);
    return {
      identity,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
