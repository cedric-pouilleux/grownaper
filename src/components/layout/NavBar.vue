<template>
  <nav class="main-nav">
    <div class="main-nav__left">
      <ul class="main-nav__list">
        <li>
          <router-link to="/">
            <button>
              {{ $t('home') }}
            </button>
          </router-link>
        </li>
        <li>
          <router-link to="/plants">
            <button>
              <font-awesome-icon icon="cannabis" />
              {{ $t('plants') }}
            </button>
          </router-link>
        </li>
        <li v-if="loggedIng">
          <router-link to="/admin">
            <button>Administration</button>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-nav__right">
      <ul class="main-nav__list">
        <li v-if="!loggedIng">
          <a href="http://localhost:3000/auth/google">
            <button>
              {{ $t('connect with google') }}
              <font-awesome-icon icon="user" />
            </button>
          </a>
        </li>
        <li v-if="loggedIng">
          <router-link to="/account">
            <button>
              {{ $t('account') }}
            </button>
          </router-link>
        </li>
        <li v-if="loggedIng">
          <button @click="disconnect">
            <font-awesome-icon icon="xmark" />
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import UsersStore from '@/store/users';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const userStore = UsersStore();
    const { loggedIng } = storeToRefs(userStore);

    userStore.getUser().then(() => {
      console.log('Get user done !');
    });

    function disconnect() {
      userStore.disconnect();
    }

    return {
      disconnect,
      loggedIng,
    };
  },
});
</script>
<style lang="scss" scoped>
.main-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(2,0,36);
  background: linear-gradient(12deg, rgba(2,0,36,1) 0%, rgba(18,80,48,1) 41%, rgba(0,212,255,1) 100%);
  font-size: 13px;

  button {
    svg {
      margin: 0 6px;
    }
  }

  .font-awesome-icon {
    margin: 12px;
  }

  .router-link-active {
    button {
      background-color: rgba(18,80,48,0.5);
    }
    button:hover {
      color: #fff;
      background-color: rgba(18,80,48,1);
    }
  }

  .inner {
    padding: 20px;
    margin: 20px;
  }

  &__right {
    padding: 0 20px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    button, a {
      padding: 0 10px;
      height: 100%;
      cursor: pointer;
      border: 0;
      color: #fff;
      background-color: initial;
    }
  }

  &__left {
    height: 40px;
    button {
      padding: 0 20px;
      height: 100%;
      cursor: pointer;
      border: 0;
      color: #fff;
      background-color: initial;
    }

    button:hover {
      color: #ebebeb;
    }
  }

  &__list {
    display: flex;
    color: #fff;
    height: 100%;
  }

  button:hover {
    background-color: #fff;
    opacity: .8;
    color: #333;
  }

}

.menu-right-tools {
  margin-left: auto;
  padding: 16px;
}
</style>
