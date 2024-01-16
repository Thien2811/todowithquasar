<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-input filled v-model="username" bg-color="white" type="text" text-color="black">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" bg-color="white">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div>
        <q-btn @click="login" label="Anmelden" color="primary" />
        <q-btn @click="moveToRegister" label="Registrieren" color="primary"></q-btn>
        <q-btn @click="test" label="test login" color="primary"></q-btn>
      </div>
    </q-form>
  </div>
</template>
<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()

const isPwd = ref(true)
const password = ref('')
const username = ref('')
const loginData = ref({})

// function login() {
//   if (username.value == 'Thien2811' && password.value == 'Password123') {
//     loginData.value.push({
//       username: username.value,
//       password: password.value
//     })
//   } else {
//     if (username.value !== 'Thien2811') {
//       alert('Falscher Benutzername')
//     } else {
//       alert('Falsche Passwort')
//     }
//   }

//   if (loginData.value.length > 0) {
//     router.push('/alltask')
//   }
// }

function moveToRegister() {
  router.push('/register')
}

async function login() {
  loginData.value = { username: username.value, password: password.value }
  const res = await axios.post('login', { login: loginData.value })
  console.log(res)
  $q.cookies.set('username', username.value)
  router.push('/createlistandtask')
}

async function test() {
  const res = await axios.get('/test')
  console.log(res)
}
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>
