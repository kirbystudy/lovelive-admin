<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        name="小埋"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['嘿，你怎么样？']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="陌生人"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="[
          '做得很好，你好吗？',
          '我只是想打一个非常非常长的消息来惹恼你......'
        ]"
        size="6"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['它奏效了吗？']"
        stamp="1 minutes ago"
        size="8"
        text-color="white"
        bg-color="primary"
      />
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
