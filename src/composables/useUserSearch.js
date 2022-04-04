import { computed, onMounted, ref } from 'vue'
import { search } from '../api/user.js'

export const useUserSearch = pagination => {
  const data = ref([])
  const fetchData = () => {
    const pageable = {
      page: pagination.value.page - 1,
      size: pagination.value.rowsPerPage
    }
    search(pageable).then(res => {
      data.value = res.content
      pagination.value.page = res.number + 1
      pagination.value.rowsPerPage = res.size
      pagination.value.rowsNumber = res.totalElements
    })
  }

  onMounted(fetchData)

  return {
    data,
    pagination,
    fetchData
  }
}
