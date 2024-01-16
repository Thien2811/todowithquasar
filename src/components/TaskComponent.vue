<template>
  <div class="container" :style="getPriorityStyle(task.priority)">
    <div>
      Aufgabe:
      <span v-if="!editMode">{{ task.taskname }}</span>
      <span v-else>
        <input class="form-control" v-model="task.taskname" />
      </span>
    </div>
    <div style="overflow: hidden" class="beschreibung">
      Beschreibung:
      <span v-if="!editMode">{{ task.aufgabenbeschreibung }}</span>
      <span v-else>
        <textarea class="form-control" v-model="task.aufgabenbeschreibung" type="text"></textarea>
      </span>
    </div>
    <div>
      Zugeörige Person(en):
      <span>{{ task.person }}</span>
    </div>
    <div>
      Status:

      <span style="margin-left: 5px" v-if="progress != 100"> Offen</span>
      <span style="margin-left: 5px" v-else>Abgeschlossen</span>
    </div>
    <div>
      Erstellungsdatum:
      <span>{{ dateNow }}</span>
    </div>
    <div>
      Fälligkeitsdatum:
      <span>{{ task.date }}</span>
    </div>

    <div>
      Fortschritt:
      <input type="range" min="0" max="100" step="25" v-model="progress" />
      <label style="margin-left: 10px"> {{ progress }}% </label>
    </div>
    <div>
      <button v-if="!editMode" class="bearbeiten" @click="switchEditMode()">Bearbeiten</button>
      <button v-if="editMode" class="bearbeiten" @click="switchEditMode()">Speichern</button>
      <button class="bearbeiten" @click="$emit('delete', id)">Löschen</button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue'

const emits = defineEmits(['delete', 'save'])
const props = defineProps(['task'])

const progress = ref(0)
const editMode = ref(false)
const task = toRef(props.task)
const createDate = new Date(Date.now())
const dateNow = createDate.toLocaleString('de').split(',')[0]

function switchEditMode() {
  editMode.value = !editMode.value
  emits('save')
}

function getPriorityStyle(priority) {
  switch (priority) {
    case 'Hoch':
      return 'border: 3px solid red;'
    case 'Mittel':
      return 'border: 3px solid orange;'
    case 'Niedrig':
      return 'border: 3px solid green;'
  }
}
</script>

<style scoped>
.container {
  background-color: black;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
}

.container:hover {
  transform: scale(1.025);
}

div {
  font-weight: bold;
  margin-top: 5px;
}

input {
  display: table-cell;
  vertical-align: middle;
}

input[type='range'] {
  accent-color: dimgrey;
}

.beschreibung {
  font-size: 100%;
}

.bearbeiten {
  margin-top: 5px;
  color: white;
  background-color: black;
  border: 1px solid white;
  margin-bottom: 5px;
  border-radius: 5px;
  margin-right: 7px;
}
</style>
