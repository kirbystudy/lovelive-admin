<script setup>
import { ref } from 'vue'
import {getIndex} from "../api";

const count = ref(0)
const message = ref("lovelive音乐后台")

const hi = ()=> {
  getIndex().then((res) => {
    message.value = res.data
  })
  message.value = "已请求"

}
</script>

<template>
  <h1>{{ message }}</h1>
  <div>
    <q-btn color="secondary" @click="count++">点击次数{{ count }}</q-btn><br><br>
    <q-btn color="secondary" @click="hi">请求服务接口</q-btn>

  </div>


</template>

<style scoped>
a {
  color: #42b983;
}


</style>
