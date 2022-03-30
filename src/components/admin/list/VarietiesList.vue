<template>
  <el-container>
    <el-header class="admin-header-options">
      <h2>Varieties</h2>
      <el-button round size="small" @click="add">New variety</el-button>
    </el-header>
    <el-table :data="varieties.all">
      <el-table-column prop="title" label="Title" width="180"  />
      <el-table-column prop="feminized" label="Feminized" />
      <el-table-column prop="automatic" label="Automatic" />
      <el-table-column prop="phenotype" label="Phenotype" />
      <el-table-column prop="floTime" label="Flowering time" />
      <el-table-column prop="breeder.title" label="Breeder" />
      <el-table-column width="100" >
        <template #default="scope">
          <el-button-group class="ml-4">
            <el-button :icon="Edit"
                       size="small"
                       @click="edit(scope.row)"/>
            <el-popconfirm title="Are you sure to delete this?"
                           @confirm="remove(scope.row)">
              <template #reference>
                <el-button :icon="Delete"
                           size="small"
                           type="danger">
                </el-button>
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
import varietiesStore from '@/store/varieties';
import { Variety } from '@/types';
import { Edit, Delete } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';

export default defineComponent({

  name: 'VarietiesList',
  emits: ['edit', 'add'],

  setup(params, { emit }) {
    const varieties = varietiesStore();
    const selected = ref<Variety | null>(null);

    async function remove(variety: Variety): Promise<void> {
      const removed = await varieties.remove(variety._id);
      if (removed) {
        ElNotification.success({
          message: `ID : ${variety._id} has been delete`,
          offset: 100,
        });
      } else {
        ElNotification.error({
          message: `Problem with remove : ${variety._id}`,
          offset: 100,
        });
      }
    }

    return {
      edit: (variety: Variety) => { emit('edit', variety); },
      add: () => { emit('add'); },
      remove,
      varieties,
      selected,
      Edit,
      Delete,
    };
  },

});
</script>
