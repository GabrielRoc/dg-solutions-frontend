<template>
  <div class="p-10">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="Nome Completo">
        <el-input class="w-full md:w-96" v-model="form.name" placeholder="João da Silva" />
      </el-form-item>
      <el-form-item label="Data de nascimento">
        <el-date-picker v-model="form.birthDate" type="date" placeholder="Selecione a data" format="DD/MM/YYYY" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Adicionar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const form = ref({
  name: '',
  birthDate: '',
})

const emit = defineEmits(['needsRefresh'])

const sucess = () => {
  ElMessage({
    message: 'Pessoa adicionada com sucesso!',
    type: 'success',
  })
}

const error = (e: any) => {
  ElMessage({
    message: 'Erro ao adicionar pessoa!',
    type: 'error',
  })

  console.log(e)
}

const onSubmit = async () => {
  try {
    await axios.post('/person/create', form.value)
    emit('needsRefresh', true)
    form.value = {
      name: '',
      birthDate: '',
    }
    sucess()
  } catch (e: any) {
    error(e)
  }
}
</script>