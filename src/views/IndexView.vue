<template>
  <h1 style="text-align: center; color: white; font-weight: bold; margin-top: 20px">
    Listen oder Tasks hinzufügen
  </h1>
  <br />
  <div style="width: 100%">
    <div class="containerr" style="margin: auto">
      <div class="add-list">
        <q-form style="display: flex" class="flex-center">
          <q-input
            standout
            v-model="listname"
            label="Listenname"
            bg-color="white"
            filled
            class="q-mr-md"
            style="max-width: 300px"
          >
            <template v-slot:append>
              <q-btn
                standout
                color="white"
                text-color="black"
                flat
                round
                icon="add"
                @click="addNewList"
                :disable="listname.length < 1"
              /> </template
          ></q-input>

          <q-input
            v-if="allLists.length > 1"
            standout
            label="Suche"
            style="max-width: 300px"
            v-model="searchValue"
            bg-color="white"
            filled
          >
            <template v-slot:append>
              <q-btn
                standout
                icon="search"
                flat
                round
                @click="search"
                color="white"
                text-color="black"
              ></q-btn>
            </template>
          </q-input>
        </q-form>
      </div>
      <carousel :items-to-show="1" ref="myCarousel" wrap-around>
        <slide v-for="(liste, index) of allLists" :key="index">
          <ListComponents :list="liste" @delete="removeList($event)" @save="save" />
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>

    <div></div>
  </div>
</template>

<script setup>
import ListComponents from '@/components/ListComponents.vue'
import { onMounted, ref, watch } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import axios from 'axios'
import { useRoute } from 'vue-router'

defineEmits(['delete'])

// if(url === l)

const listname = ref('')
const allLists = ref([])
const myCarousel = ref(null)
const searchValue = ref('')

const router = useRoute()
const url = router.query.listenname

// if (typeof url == 'string' && allLists.value.length > 0) {
//   console.log(url)
//   searchValue.value = url
//   search()
//   console.log('1')
// } else {
//   console.log('2')
// }

watch(allLists, (newValue) => {
  if (newValue.length > 0 && typeof url == 'string') {
    searchValue.value = url
    search()
  }
})

onMounted(async () => {
  const res = await axios.get('/list')
  allLists.value = res.data.lists
})

async function save() {
  await axios.post('/savelist', { lists: allLists.value })
}

async function addNewList() {
  var newId = 1

  if (allLists.value.length > 0) {
    var ids = allLists.value.map((l) => l.id)
    var max = Math.max(...ids)
    newId = max + 1
  }

  allLists.value.push({
    id: newId,
    listname: listname.value,
    tasks: ref([])
  })

  console.log(allLists.value)

  await axios.post('/savelist', { lists: allLists.value })
}
function search() {
  myCarousel.value.slideTo(allLists.value.findIndex((el) => el.listname === searchValue.value))
}

async function removeList(id) {
  const i = allLists.value.findIndex((e) => e.id === id)
  allLists.value.splice(i, 1)
  await axios.post('/savelist', { lists: allLists.value })
}
</script>

<style scoped>
.containerr {
  padding: 10px;
  background-color: #141010;
  min-height: 900px;
}

div {
  color: white;
  margin-top: 10px;
}

.addListWindow {
  font-size: 150%;
}

.inputfield {
  border-radius: 7px;
}

.whichList {
  min-width: 150px;
}
</style>

<style>
.carousel__icon path {
  color: white;
  border: white 1px solid;
}
</style>
