<template>
  <el-container>
    <el-header class="breeders-options">
      <h2>Breeders</h2>
      <el-button round size="small" @click="add">New breeder</el-button>
    </el-header>
    <el-table :data="breeders.all" style="width: 100%">
      <el-table-column prop="picture" width="40">
        <template #default="scope">
          <el-avatar size="small" :src="scope.row.picture"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="country" label="Country" />
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
import breederStore from '@/store/breeders';
import axios from 'axios';
import { Breeder } from '@/types';
import { Edit, Delete } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'BreedersList',

  emits: ['edit', 'add'],

  setup(params, { emit }) {
    const breeders = breederStore();

    const selectedBreeder = ref<Breeder | null>(null);

    async function remove(id: string): Promise<void> {
      try {
        await axios.delete(`${process.env.VUE_APP_SERVER_ADDRESS}/breeder/delete/${id}`);
        // add visual action for delete success
        await breeders.fetch();
      } catch (err) {
        console.log(err);
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
    };
  },
});
</script>

<style lang="scss" scoped>
.breeders-options {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
h2 {
  font-size: 1.4em;
}
</style>
