import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IUser } from '@/common/types';
import Api from '@/api/Api';
import Token from '@/api/Token';

const authStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const identity = ref<IUser | null>(null);

  const loggedIng = ref<boolean>(false);

  async function getUser() {
    const result = await Api.get('/user');
    if (result) {
      identity.value = result.data.user;
    }
  }

  if (Token.item) {
    loggedIng.value = true;
    token.value = Token.item;
    getUser().then(() => console.log('user featch'));
  }

  return {
    token,
    identity,
    loggedIng,
    getUser,
  };
});

export default authStore;
