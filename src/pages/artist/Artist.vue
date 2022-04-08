<template>
  <div>
    <div class="page">
      <div class="q-mt-md q-mb-md">
        <q-btn
          color="primary"
          label="添加歌手"
          @click="createDialog.showDialog()"
        />
      </div>
      <q-table :columns="columns" :rows="data" row-key="id">
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="artistStatusColor[props.value]"
              outline
              :label="artistStatus[props.value]"
            ></q-badge>
          </q-td>
        </template>
        <template #body-cell-photo="props">
          <q-td v-if="props.value" :props="props">
            <q-avatar rounded>
              <img :src="props.value.uri" alt="" />
            </q-avatar>
          </q-td>
        </template>
        <template #body-cell-operation="props">
          <q-td :props="props">
            <q-btn-dropdown
              size="sm"
              split
              color="primary"
              label="编辑"
              @click="edit(props.row)"
            >
              <q-list dense> </q-list>
            </q-btn-dropdown>
          </q-td>
        </template>
      </q-table>
    </div>
    <create-dialog
      v-if="createDialogShow"
      :data="editRow"
      @hide="createDialog.hideDialog()"
      @create-success="fetchData"
      @edit-success="fetchData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useToggleDialog } from '../../composables/useToggleDialog.js'
import CreateDialog from './CreateDialog.vue'
import { artistStatus, artistStatusColor } from '../../utils/dict.js'
import { list } from '../../api/artist.js'

const columns = [
  {
    name: 'name',
    field: 'name',
    align: 'center',
    label: '歌手名'
  },
  {
    name: 'description',
    field: 'description',
    align: 'center',
    label: '备注'
  },
  {
    name: 'photo',
    field: 'photo',
    align: 'center',
    label: '图片'
  },
  {
    name: 'status',
    field: 'status',
    align: 'center',
    label: '上架状态'
  },
  {
    name: 'operation',
    field: 'operation',
    align: 'center',
    label: '操作'
  }
]

const createDialogShow = ref(false)

const createDialog = useToggleDialog(createDialogShow)

const data = ref([])

const fetchData = () => {
  list().then(artistList => {
    data.value = artistList
  })
}
onMounted(fetchData)

const editRow = ref(null)

const edit = row => {
  editRow.value = row
  createDialog.showDialog()
}
</script>

<style scoped></style>
