<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg">
          </q-avatar>
          Learning Platform
        </q-toolbar-title>
        <q-btn v-if="$store.state.student.idStudent" color="negative" @click="logoutProcess();" style="width: 150px">
          Logout
        </q-btn>
        <q-btn v-else color="negative" @click="openDialog();" style="width: 200px">
          Register or Login
        </q-btn>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/index" label="Available Courses" />
        <q-route-tab to="/page2" label="Continuing Education " />
        <q-route-tab to="/mycourses" label="My Courses" />
        <q-route-tab to="/page4" label="Community" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view :key="$route.path"></router-view>
    </q-page-container>

    <q-footer reveal class="bg-grey-8 text-white">
      <q-tabs align="center">
        <q-route-tab to="/page1" label="© 2021 NCoding®" />
        <q-route-tab to="/page2" label="Regulatory Information" />
        <q-route-tab to="/page3" label="Terms of Use & Privacy Policy" />
        <q-route-tab to="/page4" label="Careers" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { useStore } from 'vuex'
import LoginRegister from 'src/components/LoginRegister.vue'

export default ({
  name: 'MainLayout',
  components: {
  },
  methods: {
    openDialog () {
      this.customDialog = this.$q
        .dialog({
          component: LoginRegister,
          parent: this,
          apiResponse: this.resp
        })
        .onOk(() => {
        })
        .onCancel(() => {
        })
        .onDismiss(() => {
        })
    },
    logoutProcess () {
      this.logout()
    }
  },
  mounted () {
    this.verifyLogin()
  },
  setup () {
    const $store = useStore()

    function verifyLogin () {
      $store.commit('student/initialiseStore')
    }

    function logout () {
      $store.commit('student/logout')
      this.$router.push('/index')
    }

    return {
      verifyLogin,
      logout
    }
  }
})
</script>
