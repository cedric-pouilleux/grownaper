<template>
  <el-card shadow="never" class="plant-note" v-if="plant.notes">
    <el-header class="view-header view-header__small">
      <h3>Notes ({{ plant.notes.length }})</h3>
      <div>
        <el-button size="small"
                   type="primary"
                   @click="toggleNoteForm"
                   round>
          Add note
        </el-button>
      </div>
    </el-header>

    <el-form v-if="isNoteFormOpened"
             ref="ruleFormRef"
             :rules="rules"
             :model="formData"
             size="small">
      <el-form-item prop="content">
        <el-input placeholder="Your content here"
                  v-model="formData.content"
                  type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   @click="addNote(ruleFormRef)"
                   type="primary" plain round>Submit</el-button>
      </el-form-item>
    </el-form>

    <div v-if="plant.notes.length">
      <el-table size="small" :data="plant.notes" style="width: 100%">
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

import {
  defineComponent, PropType, reactive, ref,
} from 'vue';
import { Plant } from '@/common/types';
import Moment from 'moment';
import { SIMPLE_DATETIME } from '@/common/DateFormatConfig';
import type { FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';
import PlantStore from '@/store/plants';

export default defineComponent({
  name: 'PlantNote',
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  emits: ['add-note'],
  setup(props, { emit }) {
    const ruleFormRef = ref<FormInstance>();
    const isNoteFormOpened = ref<boolean>(false);
    const formData = reactive({ content: '' });
    const plantStore = PlantStore();

    function toggleNoteForm() {
      isNoteFormOpened.value = !isNoteFormOpened.value;
    }

    const rules = reactive({
      content: [{
        required: true,
        message: 'Please input content field',
        trigger: 'blur',
      },
      {
        min: 4,
        max: 255,
        message: 'Length should be 4 to 255',
        trigger: 'blur',
      }],
    });

    async function addNote(form: FormInstance | undefined): Promise<void> {
      if (form && formData.content) {
        await form.validate(async (valid) => {
          if (valid) {
            const edited = await plantStore.addNote(props.plant._id, formData.content);
            if (edited) {
              ElNotification.success({
                message: `Add note to ${edited.name}`,
                offset: 100,
              });
              emit('add-note', edited);
            }
          }
        });
      }
    }

    return {
      isNoteFormOpened,
      toggleNoteForm,
      readableCreatedAt: (date: Date): string => Moment(date).format(SIMPLE_DATETIME),
      addNote,
      rules,
      ruleFormRef,
      formData,
    };
  },
});
</script>
