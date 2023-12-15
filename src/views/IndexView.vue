<template>
  <h1 style="text-align: center; color: white; font-weight: bold; margin-top: 20px">ToDo-Liste</h1>
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
            <q-btn
              standout
              color="white"
              text-color="black"
              flat
              round
              icon="add"
              @click="addNewList"
              :disable="listname.length < 1"
          /></q-input>

          <q-input
            v-if="allLists.length > 0"
            standout
            label="Suche"
            style="max-width: 300px"
            v-model="searchValue"
            bg-color="white"
            filled
          >
            <q-btn
              standout
              icon="search"
              flat
              round
              @click="search"
              color="white"
              text-color="black"
            ></q-btn>
          </q-input>
        </q-form>
      </div>
      <carousel :items-to-show="1" ref="list" v-if="allLists.length > 0" wrap-around>
        <slide v-for="(liste, index) of allLists" :key="index">
          <ListComponents :listname="liste.listname" />
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
import { ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const listname = ref('')
const liste = ref([])
const allLists = ref([])
const list = ref(null)
const searchValue = ref('')

function addNewList() {
  allLists.value.push({
    listname: listname.value,
    tasks: liste.value
  })
}

function search() {
  list.value.slideTo(allLists.value.findIndex((el) => el.listname === searchValue.value))
}
</script>

<style scoped>
.containerr {
  border: 3px solid white;
  padding: 10px;
  background-color: black;
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
