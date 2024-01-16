<template>
  <q-input
    v-model="username"
    filled
    type="text"
    bg-color="white"
    text-color="black"
    label="Benutzername"
  />
  <q-input
    label="Passwort"
    bg-color="white"
    v-model="password"
    filled
    :type="isPwd ? 'password' : 'text'"
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
  <q-input
    bg-color="white"
    v-model="passwordrepeat"
    filled
    :type="isPwd ? 'password' : 'text'"
    label="Passwort wiederholen"
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
  <div>
    <q-btn label="Registrieren" color="primary" @click="register"></q-btn>
    <q-btn label="Einloggen" color="primary" @click="login"></q-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Cookies } from 'quasar'

const username = ref('')
const password = ref('')
const passwordrepeat = ref('')
const isPwd = ref(true)
const registerData = ref([])

async function register() {
  if (password.value == passwordrepeat.value) {
    registerData.value = { username: username.value, password: password.value }
    await axios.post('savedlogins', { login: registerData.value })
    console.log('succesful')
  } else {
    alert('Die Passwörter stimmen nicht überein')
  }
}

async function login() {
  registerData.value = { username: username.value, password: password.value }
  const res = await axios.post('login', { login: registerData.value })
  console.log(res)
  Cookies.set('username', username.value)
}
</script>

<style scoped></style>
