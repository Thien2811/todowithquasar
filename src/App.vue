<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>ToDo</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-black'"
      >
        <q-btn @click="moveToAllTasks" label="Alle Listen anzeigen" />
        <q-btn @click="moveToCreateTaskAndList" label="Liste/Task hinzufügen" />
        <q-btn @click="moveToCompletedTaskList" label="Abgeschlossene Tasks" />
      </q-drawer>

      <q-page-container>
        <q-page>
          <RouterView />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from './router'

const drawer = ref()

function moveToAllTasks() {
  router.push('/alltask')
}

function moveToCreateTaskAndList() {
  router.push('/createlistandtask')
}

function moveToCompletedTaskList() {
  router.push()
}
</script>
