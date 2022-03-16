<template>
  <div class="breader-form">
    <h2>Add breeder</h2>
    <label for="breederForm_title">
      Title <input type="text" name="title" id="breederForm_title" v-model="title" />
    </label>
    <label for="breederForm_picture">
      Picture <input type="text" name="picture" id="breederForm_picture" v-model="picture" />
    </label>
    <label for="breederForm_link">
      Link <input type="text" name="picture" id="breederForm_link" v-model="link" />
    </label>
    <button @click="send">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'BreederForm',

  setup() {
    const link = ref('');
    const picture = ref('');
    const title = ref('');

    async function send() {
      try {
        await axios.post('https://grownaper.herokuapp.com/breeders/add', {
          link: link.value,
          picture: picture.value,
          title: title.value,
        });
      } catch (err) {
        console.log(err);
      }
    }

    return {
      link,
      picture,
      title,
      send,
    };
  },
});
</script>
