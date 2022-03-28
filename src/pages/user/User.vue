<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加用户" />
    </div>
    <q-table
      title="Treats"
      :rows="data"
      :columns="columns"
      row-key="name"
      hide-pagination
    />
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { search } from '../../api/user.js'

export default {
  name: 'User',
  setup() {
    const columns = [
      {
        field: 'id',
        label: 'ID'
      },
      {
        field: 'username',
        label: '用户名'
      },
      {
        field: 'nickname',
        label: '昵称'
      }
    ]

    const rows = [
      {
        id: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7
      }
    ]
    const data = ref([])

    const fetchData = () => {
      search({ page: 0 }).then(res => {
        data.value = data.value.concat(res.content)
        pagination.value.page = res.number + 1
        pagination.value.rowsPerPage = res.size
        pagination.value.rowsNumber = res.totalElement
      })
    }

    fetchData()

    const pagination = ref({
      page: 2,
      rowsPerPage: 10,
      rowsNumber: 10
    })
    const pagesNumber = computed(() =>
      Math.ceil(rows.length / pagination.value.rowsPerPage)
    )

    return {
      pagination,
      columns,
      rows,
      pagesNumber,
      data
    }
  }
}
</script>

<style scoped></style>
