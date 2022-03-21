<template>
  <div>这是主页 {{ nickname }}</div>
  <q-btn @click="logout">退出</q-btn>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Index',
  setup() {
    const store = useStore()
    const nickname = computed(() => store.state.user.nickname)
    const logout = () =>
      store.dispatch('user/logout').then(() => window.location.reload())
    return {
      nickname,
      logout
    }
  }
}
</script>

<style scoped></style>
