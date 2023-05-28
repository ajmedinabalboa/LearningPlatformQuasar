<template>
  <q-dialog v-model="persistent" ref="dialog" @hide="onDialogHide" fixed>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-toolbar>
            <q-btn flat v-close-popup round dense icon="close" />
            <q-toolbar-title>Log in or sign up</q-toolbar-title>
        </q-toolbar>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <h5 class="text-h6" >{{title}}</h5>
        </div>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" @click="changeTitleLogin()" />
          <q-tab name="register" label="Sign Up" @click="changeTitleRegister()"/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <q-form
              name="formlogin"
              @submit="onLogin"
              class="q-gutter-md"
            >
              <q-input
                outlined
                v-model="usernamelogin"
                label="Username"
                lazy-rules
                placeholder="Enter your Email"
                :rules="[ val => val && val.length > 0 || 'Please type your username']"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                </template>
              </q-input>

              <q-input
                outlined
                type="password"
                v-model="passwordlogin"
                label="Your Password"
                placeholder="Enter your Password"
                hint="Forgot Password?"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'Please type your password']"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                </template>
              </q-input>

              <div>
                <q-btn type="submit" rounded color="black" style="width: 150px" v-close-popup>
                  Continue
                </q-btn>
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="register">
            <q-form
              name="formregister"
              @submit="onSubmitRegister"
              class="q-gutter-md"
            >
              <q-input
                outlined
                v-model="fullname"
                label="Full name"
                lazy-rules
                placeholder="Enter your full name"
                :rules="[ val => val && val.length > 0 || 'Please type your full name']"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                </template>
              </q-input>

              <q-input
                outlined
                v-model="username"
                label="Username"
                lazy-rules
                placeholder="Enter your Email"
                :rules="[ val => val && val.length > 0 || 'Please type your email']"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                </template>
              </q-input>

              <q-input
                outlined
                type="password"
                v-model="password"
                label="Your Password"
                lazy-rules
                hint="Minimun 6 characters"
                placeholder="Enter your Password"
                :rules="[ val => val && val.length > 0 || 'Please type your password']"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                </template>
              </q-input>

              <q-input
                outlined
                type="password"
                v-model="passwordconfirm"
                label="Confirm your Password"
                lazy-rules
                placeholder="Confirm your Password"
                :rules="[ val => val && val.length > 0 || 'Please type de confirm password',
                         val => val == password || 'Password is not matched' ]">
                <template v-slot:append>
                  <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                </template>
              </q-input>

              <q-select
                outlined
                v-model="country"
                :options="options"
                label="Country"
                placeholder="Select your Country"
              >
              </q-select>

              <div>
                <q-btn type="submit" rounded color="black" style="width: 150px" v-close-popup>
                  Continue
                </q-btn>
              </div>
            </q-form>
          </q-tab-panel>

        </q-tab-panels>
      </q-card-section>
    </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { postLogin, getStudent, postRegisterStudent } from 'boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'LoginRegister',
  props: {
  },
  methods:{
  },
  setup () {
    const $q = useQuasar()
    const $store = useStore()
    const student = ref(null)
    const title = ref('Are you an existing student?')
    const usernamelogin = ref('')
    const passwordlogin = ref('')
    const fullname = ref('')
    const username = ref('')
    const password = ref('')
    const passwordconfirm = ref('')
    const country = ref('Bolivia')

    async function onLogin () {
      const login = {
        username:usernamelogin.value,
        password:passwordlogin.value
      }
      const responseLogin = await postLogin(login).catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Student does not exist',
          icon: 'report_problem'
        })
      })
      if (responseLogin.status === 200) {
        const responseStudent = await getStudent(usernamelogin.value).catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
        if (responseStudent.status === 'Success') {
          student.value = responseStudent
          $store.commit('student/login', student.value.results.id)
          $store.commit('student/sessionLogin', student.value.results.userName)
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Welcome ' + usernamelogin.value,
            icon: 'check'
          })
        }
      } else {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Login failed',
          icon: 'report_problem'
        })
      }
    }

    async function onSubmitRegister () {
      const student = {
        userName:username.value,
        password:password.value,
        fullName:fullname.value,
        country:country.value
      }
      const response = await postRegisterStudent(student).catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Sign Up failed',
          icon: 'report_problem'
        })
      })
      if (response.status === 'Success') {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Student create Successfully!',
          icon: 'check'
        })
      } else {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: response.errors[0].errorMessage,
          icon: 'report_problem'
        })
      }
    }

    return {
      student,
      usernamelogin,
      passwordlogin,
      fullname,
      username,
      password,
      passwordconfirm,
      country,
      onLogin,
      onSubmitRegister,
      tab: ref('login'),
      title,
      changeTitleLogin () {
        this.title = 'Are you an existing student?'
      },
      changeTitleRegister () {
        this.title = 'Register as a new student'
      },
      options: [
        'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Paraguay', 'Uruaguay', 'Venezuela', 'Peru', 'Ecuador', 'Colombia'
      ],
      persistent: ref(false)
    }
  }
})
</script>
