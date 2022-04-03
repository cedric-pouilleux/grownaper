<template>
  <el-scrollbar>
    <div class="plants-list">
      <el-table size="small"
                :data="all"
                style="width: 100%"
                highlight-current-row
                @current-change="open"
      >
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="variety" label="Varieties" width="200">
          <template #default="scope">
            <div v-if="scope.row.variety">
              <!-- eslint-disable max-len -->
              <div class="plants-list__cell-icons">
                <el-icon v-if="scope.row.variety?.feminized">
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="">
                    <path fill="currentColor" d="M512 640a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"></path>
                    <path fill="currentColor" d="M512 640q32 0 32 32v256q0 32-32 32t-32-32V672q0-32 32-32z"></path>
                    <path fill="currentColor" d="M352 800h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z"></path>
                  </svg>
                </el-icon>
                <el-icon v-if="scope.row.variety?.automatic">
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="">
                    <path fill="currentColor" d="M512 896a320 320 0 1 0 0-640 320 320 0 0 0 0 640zm0 64a384 384 0 1 1 0-768 384 384 0 0 1 0 768z"></path>
                    <path fill="currentColor" d="M512 320a32 32 0 0 1 32 32l-.512 224a32 32 0 1 1-64 0L480 352a32 32 0 0 1 32-32z"></path>
                    <path fill="currentColor" d="M448 576a64 64 0 1 0 128 0 64 64 0 1 0-128 0zm96-448v128h-64V128h-96a32 32 0 0 1 0-64h256a32 32 0 1 1 0 64h-96z"></path>
                  </svg>
                </el-icon>
                #{{scope.row.variety?.phenotype}} -
                {{scope.row.variety?.title}}
              </div>
              <!-- eslint-enable max-len -->
            </div>
            <div v-else>
              <el-tag type="danger">No variety, please select one</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Breeder">
          <template #default="scope">
            {{ scope.row.variety.breeder.title }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import plantStore from '@/store/plants';
import { Plant } from '@/common/types';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import {
  Male, Female, Timer, InfoFilled,
} from '@element-plus/icons-vue';

export default defineComponent({
  name: 'PlantList',

  emits: ['select'],

  setup(props, { emit }) {
    const store = plantStore();
    const { all } = storeToRefs(store);

    const selectedPlant = ref<Plant | null>(null);
    const note = ref<string | null>(null);

    return {
      remove: (id: string) => store.remove(id),
      selectedPlant,
      note,
      all,
      open: (plant: Plant) => { emit('select', plant); },
      cancel: () => { selectedPlant.value = null; },
      inputDateFormat: (date: Date | string): string => moment(date).format('YYYY-MM-DD'),
      moment,
      Male,
      Female,
      Timer,
      InfoFilled,
    };
  },

});

</script>

<style lang="scss">

  .plants-list {

    &__cell-icons {
      float: left;
      margin: 4px 8px 0 0;
    }

    &__createdAt   {
      margin-top: 6px;
      font-size: .8em;
      font-weight: 700;
    }

    header {
      padding: 12px;
    }

    p {
      margin: 0;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;

      li {
        border: 1px solid #ebebeb;
        margin: 4px;
        display: flex;
        font-size: .9em;
        align-content: center;
        flex-direction: column;
        justify-content: flex-end;
        padding: 10px;
        max-width: 140px;

        canvas {
          margin-bottom: 10px;
        }
      }
    }
  }

</style>
