<template>
  <h1>Abgeschlossene Tasks</h1>
  <div class="container">
    <div v-for="taskname in tasks">
      {{ taskname.taskname }}
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import TaskComponent from '@/components/TaskComponent.vue'

const completeList = ref([])
const tasks = ref([])

onMounted(async () => {
  const res = await axios.get('/taskdone')
  completeList.value = res.data.lists
  console.log('completedtask', completeList.value)
  for (let i = 0; i < completeList.value.length; i++) {
    let taskname = completeList.value[i].tasks
    tasks.value.push(taskname)
  }
  console.log('tasknamen', tasks.value)
})
</script>

<style scoped>
h1 {
  font-weight: bold;
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
.container {
  border: 3px solid white;
  min-height: 900px;
  background-color: black;
  padding: 10px;
}
</style>
