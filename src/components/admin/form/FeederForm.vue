<template>
  <el-drawer v-model="drawer" :before-close="handleClose" direction="ltr">
    <template #title>
      <h2>{{ selected ? 'Edit' : 'Add'}} feeder</h2>
    </template>
    <template #default>
      <el-form label-width="120px">
        <el-form-item label="Title">
          <el-input v-model="title" />
        </el-form-item>
        <el-form-item label="Link">
          <el-input v-model="link" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="description" />
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
  computed, defineComponent, PropType, reactive, ref, toRefs, watch,
} from 'vue';
import FeederStore from '@/store/feeders';
import { Feeder } from '@/common/types';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'FeederForm',

  props: {
    selected: {
      type: Object as PropType<Feeder>,
      required: false,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const feederStore = FeederStore();
    const drawer = ref<boolean>(false);

    const initialFeeder = {
      title: '',
      picture: undefined,
      description: '',
      link: '',
    };

    const feeder = reactive<Partial<Feeder>>({
      ...initialFeeder,
    });

    watch(() => props.selected, (value) => {
      Object.assign(feeder, value || initialFeeder);
    }, { immediate: true });

    watch(() => props.opened, () => {
      drawer.value = props.opened;
    }, { immediate: true });

    function change(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target?.files?.length) {
        const file = target.files[0];
        feeder.picture = file;
      }
    }

    async function action(): Promise<void> {
      if (props.selected) {
        const edited = await feederStore.edit(feeder);
        if (edited) {
          ElNotification.success({
            message: `ID : ${feeder.title} has been edited`,
            offset: 100,
          });
        }
      } else {
        const added = await feederStore.add(feeder);
        if (added) {
          ElNotification.success({
            message: `ID : ${feeder.title} has been added`,
            offset: 100,
          });
        }
      }
      emit('close');
    }

    function handleClose() {
      emit('close');
    }

    return {
      drawer,
      ...toRefs(feeder),
      edition: computed(() => !!props.selected),
      action,
      change,
      handleClose,
    };
  },
});
</script>
