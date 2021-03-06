<template>
  <div class="page">
    <div
      class="fit row no-wrap justify-start items-center content-start q-mb-md"
    >
      <div class="q-mr-md">
        <q-input
          v-model="searchKeys.name"
          outlined
          dense
          placeholder="请输入歌曲名"
        />
      </div>
      <div class="q-mr-md">
        <q-btn color="primary" label="搜索" @click="fetchData" />
      </div>
      <div class="q-mt-md q-mb-md">
        <q-btn
          color="primary"
          label="添加歌曲"
          @click="createDialog.showDialog()"
        />
      </div>
    </div>
    <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :rows="data"
      row-key="id"
      @request="fetchData"
    >
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="musicStatusColor[props.value]"
            outline
            :label="musicStatus[props.value]"
          ></q-badge>
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
            <q-list dense>
              <q-item
                v-if="props.row.status !== 'PUBLISHED'"
                v-close-popup
                clickable
                @click="publishMusic(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>上架</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-if="props.row.status === 'PUBLISHED'"
                v-close-popup
                clickable
                @click="closeMusic(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>下架</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>

    <create-dialog
      v-if="createDialogShow"
      :data="editRow"
      @hide="createDialog.hideDialog()"
      @create-success="fetchData"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { search, publish, close } from '../../api/music.js'
import CreateDialog from './CreateDialog.vue'
import { useToggleDialog } from '../../composables/useToggleDialog.js'
import { musicStatus, musicStatusColor } from '../../utils/dict.js'
import notify from '../../utils/notify.js'

const createDialogShow = ref(false)

const createDialog = useToggleDialog(createDialogShow)

const editRow = ref(null)

const edit = row => {
  editRow.value = row
  createDialog.showDialog()
}

const searchKeys = ref({ name: '' })

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10
})

const columns = [
  {
    name: 'name',
    field: 'name',
    label: '音乐名'
  },
  {
    name: 'description',
    field: 'description',
    label: '简介'
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
    label: '操作'
  }
]
const data = ref([])

const fetchData = props => {
  const { page, rowsPerPage } = props.pagination || pagination.value
  const filter = {
    ...searchKeys.value,
    page,
    size: rowsPerPage
  }
  search(filter).then(musicList => {
    data.value = musicList.content
    pagination.value = {
      page: musicList.number + 1,
      rowsPerPage: musicList.size,
      rowsNumber: musicList.totalElements
    }
  })
}

onMounted(() => fetchData({ pagination: pagination.value }))

const publishMusic = id => {
  publish(id).then(() => {
    notify.success('音乐上架成功')
    fetchData()
  })
}
const closeMusic = id => {
  close(id).then(() => {
    notify.success('音乐下架成功')
    fetchData()
  })
}
</script>

<style scoped></style>
