<template>
  <div>
    <h1>欢迎您 {{ nickname }}</h1>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Home',

  setup() {
    const store = useStore()
    const nickname = computed(() => store.state.user.currentUser.nickname)
    return {
      nickname
    }
  }
}
</script>

<style scoped></style>
