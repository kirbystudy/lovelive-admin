<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(store.dispatch('setting/fetchSiteConfig'))
</script>

<template>
  <router-view />
</template>

<style></style>
