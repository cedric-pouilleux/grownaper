<template>
  <el-container>
    <el-header class="breeders-options">
      <h2>Varieties</h2>
      <el-button round size="small" @click="add">New variety</el-button>
    </el-header>
    <el-table :data="varieties.all">
      <el-table-column prop="title" label="title" width="180"  />
      <el-table-column prop="feminized" label="feminized" />
      <el-table-column prop="automatic" label="automatic" />
      <el-table-column prop="phenotype" label="phenotype" />
      <el-table-column prop="floTime" label="floTime" />
      <el-table-column prop="breeder.title" label="breeder" />
      <el-table-column width="100" >
        <template #default="scope">
          <el-button-group class="ml-4">
            <el-button :icon="Edit"
                       size="small"
                       @click="edit(scope.row)"/>
            <el-button :icon="Delete"
                       size="small"
                       type="danger"
                       @click="remove(scope.row)"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import varietiesStore from '@/store/varieties';
import axios from 'axios';
import { Variety } from '@/types';
import { Edit, Delete } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'VarietiesList',
  emits: ['edit', 'add'],

  setup(params, { emit }) {
    const varieties = varietiesStore();

    const selected = ref<Variety | null>(null);

    async function remove(variety: Variety): Promise<void> {
      try {
        await axios.delete(`${process.env.VUE_APP_SERVER_ADDRESS}/variety/delete/${variety._id}`);
        await varieties.fetch();
      } catch (err) {
        console.log(err);
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
