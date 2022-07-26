<template>
  <div class="p-10">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="Nome Completo" prop="name" />
      <el-table-column label="Data de Nascimento" prop="birthDate">
        <template #default="scope">
          {{ new Date(scope.row.birthDate).toLocaleDateString('pt-br') }}
        </template>
      </el-table-column>
      <el-table-column label="Idade" prop="age" />
    </el-table>
    <el-pagination class="hidden md:flex justify-end pt-5" v-model:currentPage="currentPage"
      v-model:page-size="pageSize" :page-sizes="[2, 10, 50, 100]" background layout="sizes, prev, pager, next, jumper"
      :total="tableMeta.totalItems" @size-change="refreshTableData" @current-change="refreshTableData" />
    <el-pagination class="md:hidden justify-end pt-5" v-model:currentPage="currentPage" v-model:page-size="pageSize"
      :page-sizes="[2, 10, 50, 100]" background layout="prev, pager, next" :total="tableMeta.totalItems"
      @size-change="refreshTableData" @current-change="refreshTableData" />
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';

const emit = defineEmits(['refreshComplete'])
const props = defineProps({
  refresh: {
    type: Boolean,
    default: false,
  },
})

const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(true)

const { data, meta } = await axios.get('/person/list').then(res => res.data).catch(e => error(e)).finally(() => loading.value = false)
const tableData = ref(data)
const tableMeta = ref(meta)

const error = (e: any) => {
  ElMessage({
    message: 'Erro ao carregar lista!',
    type: 'error',
  })

  console.log(e)
}

const refreshTableData = async () => {
  tableData.value = []
  loading.value = true
  try {
    const { data, meta } = await axios.get('/person/list', { params: { limit: pageSize.value, page: currentPage.value } }).then(res => res.data)
    tableData.value = data
    tableMeta.value = meta
    emit('refreshComplete', false)
  } catch (e: any) {
    error(e)
  } finally {
    loading.value = false
  }
}

watch(() => props.refresh, async (newValue, oldValue) => {
  await refreshTableData()
});

</script>