<template>
  <el-drawer v-model="drawer" :before-close="handleClose">
    <template #title>
      <h2>{{ selected ? 'Edit' : 'Add'}} product</h2>
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
        <el-form-item label="Adapted for">
          <el-select v-model="type" :placeholder="feeder?.title || 'Select associate feeder'">
            <el-option v-for="list in lists" :key="list" :value="list">
              {{list}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Dosage minimun">
          <el-input v-model="dosageMin" type="number"/>
        </el-form-item>
        <el-form-item label="Dosage maximun">
          <el-input v-model="dosageMax" type="number"/>
        </el-form-item>
        <el-form-item label="Feeder">
          <el-select v-model="feeder" :placeholder="feeder?.title || 'Select associate feeder'">
            <el-option v-for="optionBreeder in feederStore.all"
                       :key="optionBreeder._id"
                       :value="optionBreeder">
              {{optionBreeder.title}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Picture">
          <el-upload type="file"
                     ref="upload"
                     :auto-upload="false"
                     :limit="1"
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
  computed,
  defineComponent, PropType, reactive, ref, toRefs, watch,
} from 'vue';
import { FeederProduct, FeederProductType } from '@/common/types';
import FeederProductStore from '@/store/feeders-products';
import FeederStore from '@/store/feeders';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'FeederProductForm',

  props: {
    selected: {
      type: Object as PropType<FeederProduct>,
      required: false,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const initial = {
      title: '',
      description: '',
      picture: undefined,
      link: '',
      feeder: undefined,
      dosageMin: undefined,
      dosageMax: undefined,
      type: undefined,
      products: [],
    };

    const lists: FeederProductType[] = ['ALL', 'FLOWERING', 'GROWING'];

    const feederStore = FeederStore();
    const drawer = ref<boolean>(false);
    const feederProductStore = FeederProductStore();

    const feederProduct = reactive<Partial<FeederProduct>>({
      ...initial,
    });

    watch(() => props.selected, (value) => {
      Object.assign(feederProduct, value || initial);
    }, { immediate: true });

    watch(() => props.opened, () => {
      drawer.value = props.opened;
    }, { immediate: true });

    async function action(): Promise<void> {
      if (props.selected) {
        const edited = await feederProductStore.edit(feederProduct);
        if (edited) {
          ElNotification.success({
            message: `ID : ${feederProduct.title} has been edited`,
            offset: 100,
          });
        }
      } else {
        const added = await feederProductStore.add(feederProduct);
        if (added) {
          ElNotification.success({
            message: `ID : ${feederProduct.title} has been added`,
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
        feederProduct.picture = file;
      }
    }

    function handleClose() {
      emit('close');
    }

    return {
      drawer,
      ...toRefs(feederProduct),
      edition: computed(() => !!props.selected),
      feederStore,
      feederProductStore,
      handleClose,
      action,
      change,
      lists,
    };
  },
});
</script>
