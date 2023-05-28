<template>
  <q-dialog v-model="dialog" @hide="onDialogHide" fixed>
    <q-card class="q-dialog-plugin" style="width:600px;">
      <q-card-section>
        <q-toolbar>
            <q-btn flat v-close-popup round dense icon="close" />
            <q-toolbar-title>Unsubscribe - {{courseSelected.courseDescription}} </q-toolbar-title>
        </q-toolbar>
      </q-card-section>
      <q-card-section>
        <q-form
              name="formlogin"
              @submit="onSubmit"
              class="q-gutter-md"
            >
          <div class="q-pa-md" style="max-width: 500px">
            <q-input
              v-model="reason"
              filled
              type="textarea"
              clearable
              label="Please type the unsubscribe reasons"
              lazu-rules
              :rules="[ val => val && val.length > 0 || 'Please type your reasons']"
            />
          </div>
          <div class="row justify-around">
            <div class="col-4">
              <q-btn @click="onSubmitRegister(courseSelected)" type="submit" rounded color="black" style="width: 150px">
                OK
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn @click="close()" rounded color="black" style="width: 150px">
                CANCEL
              </q-btn>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { putUnsubscribeCourse } from 'boot/axios'
import { useQuasar, LocalStorage } from 'quasar'

export default defineComponent({
  name: 'UnsubscribeCourse',
  props: {
    courseSelected : {}
  },
  computed: {
  },
  methods: {
    close () {
      this.$emit('hide')
    }
  },
  setup () {
    const $q = useQuasar()
    const reason = ref('')

    async function onSubmitRegister (courseSelected) {
      const idUser = LocalStorage.getItem('idStudent')
      const unsubcribe = {
        isCancelled:true,
        cancellationReason:reason.value
      }
      const response = await putUnsubscribeCourse(idUser + '/' + courseSelected.id, unsubcribe).catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Unsubscribe process failed',
          icon: 'report_problem'
        })
      })
      if (response.status === 'Success') {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Unsubscribe process course Successfully!',
          icon: 'check'
        })
        this.$emit('hide')
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
      onSubmitRegister,
      reason
    }
  }
})
</script>
