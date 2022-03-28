<template>
  <div class="admin-component varieties-list">
    <h2>Varieties</h2>
    <el-table :data="varieties.all" style="width: 100%">
      <el-table-column prop="title" label="title" width="180" />
      <el-table-column prop="feminized" label="feminized" />
      <el-table-column prop="automatic" label="automatic" />
      <el-table-column prop="phenotype" label="phenotype" />
      <el-table-column prop="floTime" label="floTime" />
      <el-table-column prop="breeder.title" label="breeder" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small"
                     @click="edit(scope.row)">Edit</el-button>
          <el-button size="small"
                     type="danger"
                     @click="remove(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import varietiesStore from '@/store/varieties';
import axios from 'axios';
import { Variety } from '@/types';

export default defineComponent({
  name: 'VarietiesList',

  emits: ['edit'],

  setup(params, { emit }) {
    const varieties = varietiesStore();

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
      remove,
      varieties,
    };
  },

});

</script>

<style lang="scss" scoped>
</style>
