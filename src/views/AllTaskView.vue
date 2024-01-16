<template>
  <h1>Alle Listen</h1>
  <div class="container">
    <tr
      style="color: black"
      class="listeneintrag"
      @click="moveToLists(list.listname)"
      v-for="(list, index) in completeList"
      :key="index"
    >
      {{
        list.listname
      }}
      <q-btn
        standout
        color="primary"
        style="margin-left: auto; margin-right: 0"
        @click.stop
        @click="console.log('Hallo')"
        icon="shortcut"
      >
      </q-btn>
      <q-btn
        standout
        color="secondary"
        icon="playlist_remove"
        @click.stop
        @click="removeList(list.listname)"
      ></q-btn>
    </tr>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import router from '../router/index'
import { Cookies } from 'quasar'

const completeList = ref([])

onMounted(async () => {
  const username = Cookies.get('username')
  console.log(username)
  const res = await axios.get(`/getlistnames?${username}`)
  completeList.value = res.data.lists
})

function moveToLists(name) {
  router.push({ path: '/createlistandtask', query: { listenname: name } })
}

async function removeList(name) {
  const i = completeList.value.findIndex((e) => e.listname === name)
  completeList.value.splice(i, 1)
}
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
  min-height: 900px;
  background-color: #141010;
  padding: 10px;
}

.listeneintrag {
  font-size: 400%;
  display: flex;
  background-color: white;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
}
</style>
