<template>
    <q-page class="window-height window-width row">
      <div class="window-width row">
        <h5 class="text-h5 q-my-md">Available Courses</h5>
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
        <q-btn v-if="$store.state.student.idStudent" @click="openDialog(course)" rounded color="black" style="width: 150px">
          Enroll
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
  </q-page>
</template>

<script>
import { defineComponent, onBeforeUnmount } from 'vue'
import { getAvailableCourses } from 'boot/axios'
import { useQuasar } from 'quasar'
import EnrollmentProcess from 'src/components/EnrollmentProcess.vue'

export default defineComponent({
  name: 'IndexPage',
  methods: {
    openDialog (course) {
      this.customDialog = this.$q
        .dialog({
          component: EnrollmentProcess,
          parent: this,
          apiResponse: this.resp,
          componentProps: {
            courseSelected : course
            // ...more..props...
          }
        })
        .onOk(() => {
        })
        .onCancel(() => {
        })
        .onDismiss(() => {
        })
    }
  },
  created () {
    this.loadData()
  },
  setup () {
    const $q = useQuasar()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })

    async function loadData () {
      this.showLoading()
      this.courses = await getAvailableCourses().catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading Available Courses failed',
          icon: 'report_problem'
        })
      })
    }

    return {
      loadData,
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
