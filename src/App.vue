<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'vfonts/Lato.css'
import { NConfigProvider } from 'naive-ui'
import { useGlobalStore } from './stores'

const globalStore = useGlobalStore()
</script>

<template>
  <NConfigProvider v-if="globalStore.theme" :theme="globalStore.theme">
    <RouterView />
  </NConfigProvider>
  <div v-else>Loading theme...</div>
</template>