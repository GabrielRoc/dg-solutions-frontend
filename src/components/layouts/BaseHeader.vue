<script lang="ts" setup>
import { toggleDark } from '~/composables';
</script>

<template>
  <div class="bg-[#17356E] w-screen pt-2">
    <div class="flex justify-between items-center text-white mr-10 ml-10">
      <div class="flex space-x-5">
        <img class="w-2/6 h-2/6"
          src="https://dgsolutions.com.br/wp-content/uploads/2021/04/logo-dg-solutions-branca.png.webp" />
        <h1> Teste Técnico </h1>
      </div>
      <i inline-flex i="dark:ep-moon ep-sunny" @click="toggleDark()" />
    </div>
    <el-divider class="p-0 m-0" />
  </div>
</template>
