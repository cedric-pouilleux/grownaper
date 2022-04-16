import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IUser } from '@/common/types';
import Api from '@/api/Api';
import Token from '@/api/Token';

const authStore = defineStore('auth', () => {
  const identity = ref<IUser | null>(null);

  const loggedIng = ref<boolean>(false);

  async function getUser(): Promise<void> {
    if (!Token.item) {
      return;
    }
    const result = await Api.get('/user');
    if (result) {
      loggedIng.value = true;
      identity.value = result.data.user;
    }
  }

  function disconnect(): void {
    Token.removeToken();
    loggedIng.value = false;
    identity.value = null;
  }

  return {
    identity,
    loggedIng,
    getUser,
    disconnect,
  };
});

export default authStore;
