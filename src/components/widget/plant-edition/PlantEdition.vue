<template>
  <el-form size="small" class="edit-plant-form" label-width="110px">
    <plant-edition-input-name v-model:name="form.name"/>
    <plant-edition-variety v-model:variety="form.variety"/>
    <plant-edition-growing-date v-model:growing-date="form.startGrowingDate"/>
    <plant-edition-flowering-date v-model:flowering-date="form.startFloweringDate"/>
    <el-form-item>
      <el-button type="primary" @click="savePlantInDatabase" v-if="canSave">
        {{ $t('save') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {
  computed, ComputedRef, defineComponent, reactive, watch,
} from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import PlantResource from '@/resources/PlantResource';
import PlantEditionInputName from '@/components/widget/plant-edition/inputs/PlantEditionName.vue';
import PlantEditionVariety from '@/components/widget/plant-edition/inputs/PlantEditionVariety.vue';
import PlantEditionFloweringDate
  from '@/components/widget/plant-edition/inputs/PlantEditionFloweringDate.vue';
import PlantEditionGrowingDate
  from '@/components/widget/plant-edition/inputs/PlantEditionGrowingDate.vue';
import Moment from 'moment';
import { isEqual } from '@/common/utils';
import { ElNotification } from 'element-plus';
import PlantStore from '@/store/plants';

export default defineComponent({
  name: 'PlantEdition',
  components: {
    PlantEditionGrowingDate,
    PlantEditionFloweringDate,
    PlantEditionVariety,
    PlantEditionInputName,
  },
  props: {
    plant: {
      type: PlantResource,
      required: true,
    },
    compare: {
      type: PlantResource,
      required: true,
    },
  },
  emits: ['change', 'save'],
  setup(props, { emit }) {
    const plantStore = PlantStore();

    const form = reactive<Partial<PlantResource>>({
      startFloweringDate: props.plant.startFloweringDate || undefined,
      startGrowingDate: props.plant.startGrowingDate || undefined,
      variety: props.plant.variety || undefined,
      name: props.plant.name || undefined,
    });

    watch(() => form, (value) => {
      emit('change', {
        ...props.plant,
        ...value,
      });
    }, { deep: true });

    const isSameDate: ComputedRef<boolean> = computed(
      (): boolean => {
        const a = Moment(props.compare.startFloweringDate)
          .isSame(form.startFloweringDate, 'day');
        return a;
      },
    );

    const isSameGrowingDate: ComputedRef<boolean> = computed(
      (): boolean => Moment(props.compare.startGrowingDate)
        .isSame(form.startGrowingDate, 'day'),
    );

    const isSameVariety: ComputedRef<boolean> = computed(
      (): boolean => isEqual(props.compare.variety, form.variety),
    );

    const isSameName: ComputedRef<boolean> = computed(
      (): boolean => props.compare.name === form.name,
    );

    const canSave: ComputedRef<boolean> = computed(
      (): boolean => !(isSameName.value
        && isSameVariety.value
        && isSameDate.value
        && isSameGrowingDate.value),
    );

    watch(() => props.plant, (value) => {
      form.startFloweringDate = value.startFloweringDate || undefined;
      form.startGrowingDate = value.startGrowingDate || undefined;
      form.variety = value.variety || undefined;
      form.name = value.name || undefined;
    });

    async function savePlantInDatabase(plant: PlantResource): Promise<void> {
      // TODO => use for define history database push, add this logic in backend
      const params: Partial<PlantResource> = {
        ...!isSameVariety.value ? { variety: form.variety } : {},
        ...!isSameName.value ? { name: form.name } : {},
        ...!isSameDate.value ? { startFloweringDate: form.startFloweringDate } : {},
        ...!isSameGrowingDate.value ? { startGrowingDate: form.startGrowingDate } : {},
      };
      if (props.plant._id) {
        const edited = await plantStore.edit(props.plant._id, params);
        if (edited) {
          ElNotification.success({
            message: `PlantResource ${edited.name} has been edited`,
            offset: 100,
          });
          emit('save', edited);
        }
      }
    }

    return {
      form,
      canSave,
      savePlantInDatabase,
      Refresh,
    };
  },
});
</script>

<style lang="scss" scoped>
.edit-plant-form {
  padding-top: 12px;
}

.el-select {
  width: 100%
}
</style>
