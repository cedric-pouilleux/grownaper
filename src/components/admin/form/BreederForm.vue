<template>

  <el-drawer v-model="drawer" direction="ltr" :before-close="handleClose">
    <template #title>
      <h2>{{ selected ? 'Edit' : 'Add' }} breeder</h2>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="Title">
          <el-input v-model="title" />
        </el-form-item>
        <el-form-item label="Website Link">
          <el-input v-model="link" />
        </el-form-item>
        <el-form-item label="Country">
          <el-input v-model="country" />
        </el-form-item>
        <el-form-item label="Picture">
          <el-upload type="file"
                     ref="upload"
                     :auto-upload="false"
                     :limit="1"
                     class="upload-demo"
                     name="picture"
                     v-model="picture"
                     @change="change">
            <template #trigger>
              <el-button type="primary">Select file</el-button>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button size="large" type="primary" @click="action">
          {{ selected ? 'Save' : 'Add'}}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import {
  defineComponent, PropType, toRefs, reactive, computed, watch, ref,
} from 'vue';
import BreederStore from '@/store/breeders';
import { Breeder } from '@/types';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'BreederForm',

  props: {
    selected: {
      type: Object as PropType<Breeder>,
      required: false,
    },

    opened: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['cancel', 'close'],

  setup(props, { emit }) {
    const breederStore = BreederStore();
    const drawer = ref<boolean>(false);

    const initialBreeder = {
      link: '',
      picture: undefined,
      title: '',
      country: '',
    };

    const breeder = reactive<Partial<Breeder>>({
      ...initialBreeder,
    });

    watch(() => props.selected, (value) => {
      Object.assign(breeder, value || initialBreeder);
    }, { immediate: true });

    watch(() => props.opened, () => {
      drawer.value = props.opened;
    }, { immediate: true });

    async function action(): Promise<void> {
      if (props.selected) {
        const edited = await breederStore.edit(breeder);
        if (edited) {
          ElNotification.success({
            message: `Title : ${breeder.title} has been edited`,
            offset: 100,
          });
        }
      } else {
        const added = await breederStore.add(breeder);
        if (added) {
          ElNotification.success({
            message: `ID : ${breeder.title} has been added`,
            offset: 100,
          });
        }
      }
      emit('close');
    }

    function change(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target?.files?.length) {
        const file = target.files[0];
        breeder.picture = file;
      }
    }

    return {
      ...toRefs(breeder),
      edition: computed(() => !!props.selected),
      cancel: () => emit('cancel'),
      change,
      action,
      drawer,
      handleClose: () => emit('close'),
    };
  },
});
</script>
