<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>小埋音乐</q-toolbar-title>

        <q-space />
        <q-avatar color="teal" text-color="white"
          >{{ nickname }}
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item v-close-popup clickable @click="handleLogout">
                退出
              </q-item>
              <q-item-section></q-item-section>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
      <q-list padding class="text-primary">
        <q-item
          v-for="item in menuRoutes"
          :key="item.meta.title"
          v-ripple
          :active="item.name === route.name"
          :to="item.path"
          clickable
          active-class="menu-active"
        >
          <q-item-section avatar>
            <q-icon :name="item.meta.icon" />
          </q-item-section>

          <q-item-section>{{ item.meta.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { menuRoutes } from '../router'
import { useRoute } from 'vue-router'

export default {
  name: 'Layout',
  setup() {
    const leftDrawerOpen = ref(false)

    const store = useStore()
    const route = useRoute()

    const nickname = computed(() => store.getters['user/nicknameFirstWord'])

    const handleLogout = () => {
      store.dispatch('user/logout').then(() => window.location.reload())
    }

    return {
      nickname,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      menuRoutes,
      route,
      handleLogout
    }
  }
}
</script>

<style lang="sass">
.menu-active
  color: white !important
  background: #73cdb7
</style>
