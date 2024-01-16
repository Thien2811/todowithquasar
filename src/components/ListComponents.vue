<template>
  <div class="containerr" style="width: 1000px; padding: 10px">
    <div class="listenname">{{ list.listname }}</div>
    <q-form style="display: flex" class="flex-center">
      <q-btn
        v-if="!taskAddMode"
        @click="toggleAddTask"
        icon="remove"
        color="white"
        text-color="black"
        style="margin-right: 15px"
      />
      <q-btn
        v-if="taskAddMode"
        @click="toggleAddTask"
        icon="add"
        color="white"
        text-color="black"
        style="margin-right: 15px"
      />
      <q-btn @click="$emit('delete', list.id)" icon="delete" color="white" text-color="black" />
    </q-form>
    <div class="add-task" v-if="!taskAddMode">
      <div class="addTask flex-nowrap" style="padding: 0px">
        <q-input standout v-model="taskname" label="Taskname" bg-color="white" filled />
      </div>
      <div class="addTask flex-nowrap" style="padding: 0px">
        <q-input
          standout
          v-model="aufgabenbeschreibung"
          label="Aufgabenbeschreibung"
          bg-color="white"
          type="textarea"
          filled
        />
      </div>
      <div class="flex-nowrap">
        <q-select
          standout
          v-model="priority"
          label="Priorität"
          bg-color="white"
          :options="options"
        />
      </div>
      <div>
        <q-select
          standout
          v-model="person"
          label="Zugehörige Mitglieder"
          bg-color="white"
          :options="mitglieder"
        />
      </div>
      <div>
        <div class="datepicker" style="max-width: 300px">
          <q-input
            standout
            input-style="color: black;"
            bg-color="white"
            v-model="date"
            label="Fälligkeitsdatum"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date dark v-model="date" mask="DD.MM.YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <div>
        <q-btn
          standout
          color="white"
          text-color="black"
          label="Task hinzufügen"
          @click="addNewTask"
        ></q-btn>
      </div>
    </div>
    <TaskComponent
      v-for="(i, index) of liste.tasks"
      :key="index"
      :task="i"
      @delete="remove($event)"
      @save="$emit('save')"
    ></TaskComponent>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue'
import TaskComponent from './TaskComponent.vue'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()

const props = defineProps(['list'])

const emits = defineEmits(['delete', 'save'])

const taskAddMode = ref(false)
const options = ['Hoch', 'Mittel', 'Niedrig']
const mitglieder = [
  'Thien',
  'Dani',
  'Andi',
  'Chris',
  'Sebi',
  'Nicole',
  'Kathi',
  'Elmar',
  'Vanessa',
  'Daniel',
  'Marc',
  'Domi'
]
const taskname = ref()
const priority = ref('Priorität')
const aufgabenbeschreibung = ref('')
const person = ref('Zugehörige Person')
const liste = toRef(props.list)

function toggleAddTask() {
  taskAddMode.value = !taskAddMode.value
}

function addNewTask() {
  var newId = 1

  if (liste.value.length > 0) {
    var ids = liste.value.map((l) => l.id)
    var max = Math.max(...ids)
    newId = max + 1
  }

  liste.value.tasks.push({
    id: newId,
    taskname: taskname.value,
    priority: priority.value,
    aufgabenbeschreibung: aufgabenbeschreibung.value,
    person: person.value,
    date: date.value?.toLocaleString('de').split(', ')[0]
  })
  liste.value.tasks = liste.value.tasks.sort(
    (a, b) => getPriorityInt(b.priority) - getPriorityInt(a.priority)
  )

  emits('save')
}
function getPriorityInt(priority) {
  switch (priority) {
    case 'Hoch':
      return 3
    case 'Mittel':
      return 2
    case 'Niedrig':
      return 1
  }
}

function remove(id) {
  const i = liste.value.tasks.findIndex((e) => e.id === id)
  liste.value.tasks.splice(i, 1)
  emits('save')
}
</script>

<style scoped>
.listenname {
  color: white;
  font-size: 200%;
  font-weight: bold;
}

.btn {
  background-color: white;
}

div {
  margin-top: 10px;
}

.containerr {
  min-height: 900px;
}
</style>

<style>
.q-item__label span {
  color: black;
}
.q-field__native.items-center span {
  color: black;
}

.datepicker i {
  color: black;
}
</style>
