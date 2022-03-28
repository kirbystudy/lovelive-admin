<template>
  <div class="login-page">
    <q-card class="login-box">
      <div class="login-title">小埋音乐后台</div>
      <q-form class="q-gutter-md" @submit="onSubmit(username, password)">
        <q-input
          v-model="username"
          filled
          label="用户名"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入用户名']"
        />

        <q-input
          v-model="password"
          filled
          type="password"
          label="密码"
          lazy-rules
          :rules="[val => (val !== null && val !== '') || '请输入密码']"
        />

        <q-toggle v-model="accept" label="记住我" />

        <div>
          <q-btn
            class="full-width"
            label="登录"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'Login',
  setup() {
    const accept = ref(false)
    const username = ref('')
    const password = ref('')

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const onSubmit = (username, password) => {
      store.dispatch('user/login', { username, password }).then(() => {
        store.dispatch('user/fetchCurrentUser').then(() => {
          router.push({ path: route.query.redirect || '/' })
        })
      })
    }
    return {
      accept,
      username,
      password,
      onSubmit
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-box {
    .login-title {
      font-size: 40px;
      text-align: center;
      margin-bottom: 50px;
    }
    width: 400px;
    padding: 20px;
  }
}
</style>
