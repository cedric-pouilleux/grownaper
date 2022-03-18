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
      Link <input type="text" name="link" id="breederForm_link" v-model="link" />
    </label>
    <label for="breederForm_country">
      Country <input type="text" name="country" id="breederForm_country" v-model="country" />
    </label>
    <button @click="send">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import BreederStore from '@/store/breeders';

export default defineComponent({
  name: 'BreederForm',

  setup() {
    const link = ref('');
    const picture = ref('');
    const title = ref('');
    const country = ref('');
    const breederStore = BreederStore;

    async function send() {
      try {
        await axios.post('https://grownaper.herokuapp.com/breeders/add', {
          link: link.value,
          picture: picture.value,
          title: title.value,
          country: country.value,
        });
        await breederStore().fetch();
      } catch (err) {
        console.log(err);
      }
    }

    return {
      link,
      picture,
      title,
      send,
      country,
    };
  },
});
</script>
