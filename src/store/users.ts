import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IUser } from '@/common/types';

const authStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const identity = ref<IUser | null>(null);

  const user = ref<object | null>(null);
  const loggedIng = ref<boolean>(false);

  const tokenStorage = localStorage.getItem('AUTH_TOKEN_KEY');

  if (tokenStorage) {
    loggedIng.value = true;
    token.value = tokenStorage;
  }

  function refreshToken(pToken) {
    loggedIng.value = true;
    user.value = { ...user.value, token: pToken };
  }

  return {
    token,
    identity,
    loggedIng,
    refreshToken,
  };
});

export default authStore;
