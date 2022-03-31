<template>
  <el-container>
    <el-header class="admin-header-options">
      <h2>Breeders</h2>
      <el-button round type="primary" @click="add" :icon="Plus">New</el-button>
    </el-header>
    <el-table :data="breeders.all" style="width: 100%">
      <el-table-column prop="picture" width="40">
        <template #default="scope">
          <el-avatar size="small" :src="scope.row.picture"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="varieties" label="Varieties">
        <template #default="scope">
          {{ scope.row.varieties.length }}
        </template>
      </el-table-column>
      <el-table-column prop="country" label="Country" />
      <el-table-column width="100" >
        <template #default="scope">
          <el-button-group class="ml-4">
            <el-button :icon="Edit"
                       size="small"
                       @click="edit(scope.row)"/>
            <el-popconfirm title="Are you sure to delete this?"
                           @confirm="remove(scope.row._id)">
              <template #reference>
                <el-button :icon="Delete"
                           size="small"
                           type="danger"/>
              </template>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import breederStore from '@/store/breeders';
import { Breeder } from '@/types';
import { Edit, Delete, Plus } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'BreedersList',

  emits: ['edit', 'add'],

  setup(params, { emit }) {
    const breeders = breederStore();

    const selectedBreeder = ref<Breeder | null>(null);

    async function remove(id: string): Promise<void> {
      const removed = await breeders.remove(id);
      if (removed) {
        ElNotification.success({
          message: `ID : ${id} has been delete`,
          offset: 100,
        });
      } else {
        ElNotification.error({
          message: `Problem with remove : ${id}`,
          offset: 100,
        });
      }
    }

    return {
      remove,
      cancel: () => { selectedBreeder.value = null; },
      edit: (breeder: Breeder) => { emit('edit', breeder); },
      add: () => { emit('add'); },
      breeders,
      selectedBreeder,
      Edit,
      Delete,
      Plus,
    };
  },
});
</script>
