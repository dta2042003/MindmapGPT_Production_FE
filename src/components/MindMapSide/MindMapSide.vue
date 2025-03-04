<script setup lang="ts">
import { NButton, NLayoutSider, NScrollbar } from 'naive-ui'
import { Icon } from '@iconify/vue'
import NoteCard from './NoteCard.vue'
import { useCommandModal } from '@/components/command/commandModal'
import { useNoteStore } from '@/stores'
import { messageError } from '@/hooks/message'

const notesStore = useNoteStore()
const { openCommandModal } = useCommandModal()
const role = localStorage.getItem('role')

function handleNewClick() {
  if(role == "User") {
    messageError("Please purchase the $1.37 package to use this feature.");
    return;
  }
  const item = notesStore.addNote('')
  notesStore.setCurrentEditId(item.id)
}
function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  // Redirect to login page
  window.location.href = "http://localhost:5173/login"
}
</script>

<template>
  <NLayoutSider collapse-mode="width" :collapsed-width="0" :width="360" show-trigger="bar" bordered>
    <div class="h-full w-full bg-[#0F1729] overflow-hidden">
      <div class="p-2 flex items-center justify-between">
        <NButton type="primary" @click="handleNewClick">
          <template #icon>
            <Icon icon="material-symbols:add" />
          </template>
          New
        </NButton>
        <NButton v-if="role !== 'User'" type="primary" ghost @click="openCommandModal()">
          <template #icon>
            <Icon icon="material-symbols:search" />
          </template>
        </NButton>
      </div>
      <NScrollbar style="max-height: calc(100% - 25px);">
        <div class="p-2 flex flex-col gap-2">
          <NoteCard v-for="note in notesStore.reverseNoteList" :key="note.id" :data="note" />
        </div>
        <NButton type="error" style="position: fixed; bottom: 4px; left: 4px;" @click="handleLogout">
          Log out
        </NButton>
      </NScrollbar>
    </div>
  </NLayoutSider>
</template>

<style scoped></style>
