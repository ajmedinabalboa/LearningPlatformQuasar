<template>
  <q-page class="window-height window-width row">
    <div class="window-width row">
      <h5 class="text-h5 q-my-md">My Courses</h5>
    </div>
  <div class="q-pa-md row items-start q-gutter-md" >
    <q-card class="my-card" flat bordered v-for="course in courses" :key="course.id">
    <q-img src="../assets/courseimage.jpg" />
    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ course.courseDescription }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-caption">
        {{course.abstractDescription}}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row no-wrap ">
        <div class="col-auto text-caption q-pt-md row no-wrap items-center">
          <q-icon name="star" />
          {{course.rate}}
        </div>
        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
          ({{course.attendance}})
        </div>
      </div>
      <div class="col-auto text-caption q-pt-md row no-wrap items-center">
          <q-icon name="schedule" />
          {{course.totalHours}}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn rounded color="black" style="width: 130px">
        View Details
      </q-btn>
      <q-btn @click="openDialog(course)" rounded color="black" style="width: 130px">
        Unsuscribe
      </q-btn>
    </q-card-actions>
  </q-card>
</div>
</q-page>
</template>

<script >
import { defineComponent, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { getCoursesEnrolled } from 'boot/axios'
import { useQuasar } from 'quasar'
import UnsubscribeCourse from 'src/components/UnsubscribeCourse.vue'

export default defineComponent({

  name: 'IndexPage',
  beforeCreate () {
    this.verifyLogin()
  },
  created () {
    if (this.$store.state.student.idStudent) {
      const idStudent = this.$store.state.student.idStudent
      this.loadData(idStudent)
    }
  },
  methods: {
    openDialog (course) {
      this.customDialog = this.$q
        .dialog({
          component: UnsubscribeCourse,
          parent: this,
          apiResponse: this.resp,
          componentProps: {
            courseSelected : course,
            dialog:true
            // ...more..props...
          }
        })
        .onOk(() => {
        })
        .onCancel(() => {
          const idStudent = this.$store.state.student.idStudent
          this.loadData(idStudent)
        })
        .onDismiss(() => {
        })
    }
  },
  mounted () {

  },
  setup () {
    const $q = useQuasar()
    const $store = useStore()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })

    async function loadData (idStudent) {
      this.showLoading()
      this.courses = await getCoursesEnrolled(idStudent)
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Enrollment Process failed',
            icon: 'report_problem'
          })
        })
      if (this.courses.length === 0) {
        $q.notify({
          color: 'warning',
          position: 'top',
          message: 'Please enroll a course',
          icon: 'warning'
        })
      }
    }

    function verifyLogin () {
      $store.commit('student/initialiseStore')
      if (!$store.state.student.idStudent) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'You must login first',
          icon: 'report_problem'
        })
        this.$router.push('/index')
      }
    }

    return {
      loadData,
      verifyLogin,
      courses:[],
      showLoading () {
        $q.loading.show()
        // hiding in 2s
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 2000)
      }
    }
  }
})
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 300px
</style>
