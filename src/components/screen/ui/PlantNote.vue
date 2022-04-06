<template>
  <el-card shadow="never" class="plant-note">
    <el-header class="view-header view-header__small">
      <h3>Notes ({{ notes.length }})</h3>
      <div>
        <el-button size="small"
                   type="primary"
                   @click="toggleNoteForm"
                   round>
          Add note
        </el-button>
      </div>
    </el-header>

    <el-form v-if="isNoteFormOpened">
      <el-form-item>
        <el-input required placeholder="Your content here" v-model="content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addNote" type="primary" plain round>Submit</el-button>
      </el-form-item>
    </el-form>

    <div class="" v-if="notes.length">
      <el-table size="small" :data="notes" style="width: 100%">
        <el-table-column prop="createdAt" label="Date" :width="125">
          <template #default="scope">
            {{readableCreatedAt(scope.row.createdAt)}}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="Content" />
      </el-table>
    </div>
    <el-alert v-else title="This plant don't have note" :closable="false"/>
  </el-card>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { Note } from '@/common/types';
import Moment from 'moment';
import { READABLE_DATETIME, SIMPLE_DATETIME } from '@/common/DateFormatConfig';

export default defineComponent({
  name: 'PlantNote',
  props: {
    notes: Array as PropType<Note[]>,
  },
  emits: ['add-note'],
  setup(props, { emit }) {
    const content = ref<string | null>(null);
    const isNoteFormOpened = ref<boolean>(false);

    function toggleNoteForm() {
      isNoteFormOpened.value = !isNoteFormOpened.value;
    }

    return {
      isNoteFormOpened,
      toggleNoteForm,
      content,
      readableCreatedAt: (date: Date): Date => Moment(date).format(SIMPLE_DATETIME),
      addNote: () => { emit('add-note', content.value); },
    };
  },
});
</script>
