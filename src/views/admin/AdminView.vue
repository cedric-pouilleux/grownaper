<template>
  <admin-ui-navigation/>
  <el-container>
    <el-main>
      <h2>Dashboard</h2>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminUiNavigation from '@/components/admin/ui/Navigation.vue';

export default defineComponent({
  name: 'AdminPage',
  components: {
    AdminUiNavigation,
  },
});
</script>
