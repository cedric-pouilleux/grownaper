<template>
  <label :for="'addNote_input-' + id">
    Add note
    <input type="text"
           v-model="content"
           :id="'addNote_input-' + id" />
    <button v-if="content" class="btn" @click="addNote">Add</button>
  </label>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlantStore from '@/store/plants';

export default defineComponent({
  name: 'PlantNote',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const plantStore = PlantStore();
    const content = ref<string|null>(null);

    function addNote() {
      if (content.value) {
        plantStore.addNote(props.id, content.value);
      }
    }

    return {
      content,
      addNote,
    };
  },
});
</script>
