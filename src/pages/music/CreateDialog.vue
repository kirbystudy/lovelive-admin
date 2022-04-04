<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加音乐</div>
      </q-card-section>
      <q-form
        class="q-gutter-md"
        @submit="isEdit ? editMusic() : createMusic()"
      >
        <q-card-section class="q-pt-none">
          <q-input
            v-model="music.name"
            label="音乐名"
            dense
            autofocus
            :rules="[val => (val && val.length > 0) || '请填写音乐名']"
            @keyup.enter="show = false"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            v-model="music.description"
            label="简介"
            dense
            autofocus
            @keyup.enter="show = false"
          />
          <q-card-section>
            <uploader v-model:file="music.file" label="上传音乐" />
          </q-card-section>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" type="submit" label="确认" />
          <q-btn v-close-popup flat label="取消" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineEmits, reactive, ref } from 'vue'
import { create, update } from '../../api/music.js'
import notify from '../../utils/notify.js'
import Uploader from '../../components/Uploader.vue'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return null
    }
  }
})

const show = ref(true)
const file = ref(null)
const isEdit = ref(Boolean(props.data))
const music = reactive(props.data || { name: '', description: '', file: null })
const emit = defineEmits(['create-success', 'edit-success'])
const createMusic = () => {
  create(music).then(createdMusic => {
    show.value = false
    notify.success(`音乐《${createdMusic.name}》创建成功`)
    emit('create-success')
  })
}

const editMusic = () => {
  update(music.id, music).then(updatedMusic => {
    show.value = false
    notify.success(`音乐《${updatedMusic.name}》更新成功`)
    emit('edit-success')
  })
}
</script>

<style scoped></style>
