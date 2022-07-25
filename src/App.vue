<template>
  <el-config-provider namespace="ep" :locale="locale">
    <BaseHeader />
    <div class="flex flex-col justify-center">
      <person-input @needsRefresh="refresh = $event" />
      <Suspense>
        <person-table @refreshComplete="refresh = $event" :refresh="refresh" />
        <template #fallback>
          <div>Carregando...</div>
        </template>
      </Suspense>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus';
import ptBr from 'element-plus/lib/locale/lang/pt-br';
import { ref } from 'vue';

const locale = ref(ptBr)

const refresh = ref(false)
</script>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}
</style>
