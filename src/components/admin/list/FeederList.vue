<template>
  <el-container>
    <el-header class="admin-header-options">
      <h2>Feeders</h2>
      <el-button round size="small" @click="add">New feeder</el-button>
    </el-header>
    <el-table :data="all" style="width: 100%">
      <el-table-column prop="picture" width="40">
        <template #default="scope">
          <el-avatar size="small" :src="scope.row.picture"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="link" label="Links" />
      <el-table-column width="100" >
        <template #default="scope">
          <el-button-group class="ml-4">
            <el-button :icon="Edit"
                       size="small"
                       @click="edit(scope.row)"></el-button>

            <el-button :icon="Delete"
                       size="small"
                       type="danger"
                       @click="remove(scope.row._id)">
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Feeder } from '@/types';
import feederStore from '@/store/feeders';
import { Edit, Delete } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'FeederList',

  emits: ['edit', 'add'],

  setup(params, { emit }) {
    const store = feederStore();
    const { all } = storeToRefs(store);

    const selectedFeeder = ref<Feeder | null>(null);

    return {
      remove: (id: string) => store.remove(id),
      cancel: () => { selectedFeeder.value = null; },
      edit: (feeder: Feeder) => { emit('edit', feeder); },
      add: () => { emit('add'); },
      all,
      selectedFeeder,
      Edit,
      Delete,
    };
  },

});
</script>
