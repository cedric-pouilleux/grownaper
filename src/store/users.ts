import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { IUser } from '@/common/types';

const authStore = defineStore('auth', () => {
  const SERVER = process.env.VUE_APP_SERVER_ADDRESS;
  const token = ref<string | null>(null);
  const identity = ref<IUser | null>(null);

  async function setUser(): Promise<void> {
    const result = await axios.get(`${SERVER}/auth/user`);
    if (result.data.user) {
      identity.value = result.data.user;
    }
  }

  // TODO => Rework all this behavior
  async function setToken(userToken: string | null = null): Promise<void> {
    if (token.value) {
      axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
      await setUser();
      return;
    }
    const localToken = localStorage.getItem('AUTH_TOKEN_KEY');
    console.log(localToken);
    if (localToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${localToken}`;
      token.value = localToken;
      await setUser();
      return;
    }
    console.log(userToken);
    if (userToken) {
      console.log('innter');
      axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
      localStorage.setItem('AUTH_TOKEN_KEY', userToken);
      token.value = userToken;
      await setUser();
    }
  }

  return {
    token,
    identity,
    setToken,
  };
});

export default authStore;
