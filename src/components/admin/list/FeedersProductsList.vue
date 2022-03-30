<template>
  <el-container>
    <el-header class="admin-header-options">
      <h2>Products</h2>
      <el-button round size="small" @click="add">New product</el-button>
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
            <el-popconfirm title="Are you sure to delete this?"
                           @confirm="remove(scope.row._id)">
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
import { storeToRefs } from 'pinia';
import { FeederProduct } from '@/types';
import feederProductStore from '@/store/feeders-products';
import { Edit, Delete } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'FeederProductList',
  emits: ['edit', 'add'],
  setup(props, { emit }) {
    const store = feederProductStore();
    const { all } = storeToRefs(store);

    const selectedFeederProduct = ref<FeederProduct | null>(null);

    return {
      selectedFeederProduct,
      all,
      remove: (id: string) => store.remove(id),
      add: () => { emit('add'); },
      edit: (feederProduct: FeederProduct) => { emit('edit', feederProduct); },
      cancel: () => { selectedFeederProduct.value = null; },
      Edit,
      Delete,
    };
  },
});
</script>
