<template>
  <h1>Alle Tasks</h1>
  <div>
    <ListComponents
      v-for="(liste, index) of allLists"
      :key="index"
      :listname="liste.listname"
    ></ListComponents>
  </div>
</template>

<script setup>
import TaskComponent from '@/components/TaskComponent.vue'
import ListComponents from '@/components/ListComponents.vue'
</script>

<style scoped></style>
