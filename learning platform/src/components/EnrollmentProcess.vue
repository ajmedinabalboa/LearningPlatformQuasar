<template>
  <q-dialog v-model="dialog" @hide="onDialogHide" fixed>
    <q-card class="q-dialog-plugin" style="max-width: 1000px;width:800px;">
      <q-card-section>
        <q-toolbar>
            <q-btn flat v-close-popup round dense icon="close" />
            <q-toolbar-title>Application Process - {{courseSelected.courseDescription}} </q-toolbar-title>
        </q-toolbar>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md">
          <q-stepper
            v-model="step"
            ref="stepper"
            color="white"
            animated
          >
            <q-step
              :name="1"
              prefix="1"
              title="Personal Information"
              :done="step > 1"
            >
              <v-toolbar>
                <v-toolbar-title class="text-center">
                  <p class="text-h6">Personal Details</p>
                  <p><small>Have questions about the application? Want some more info? Call us! 65170024</small></p>
                </v-toolbar-title>
              </v-toolbar>

              <q-form
              name="formlogin"
              @submit="onSubmit"
              class="q-gutter-md"
              >
                <div class="row">
                  <div class="q-pa-xs col-lg-6">
                    <q-input outlined filled v-model="birthdate" mask="date" :rules="['birthdate']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="birthdate">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <div class="q-pa-xs col-lg-6">
                    <q-input
                      outlined
                      v-model="gender"
                      label="Gender"
                      placeholder="Enter your Gender"
                      lazy-rules
                      :rules="[
                        val => val !== null && val !== '' || 'Please type your Gender']"
                    >
                      <template v-slot:append>
                        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row">
                  <div class="q-pa-xs col-lg-12">
                    <q-input
                      outlined
                      v-model="address"
                      label="Address"
                      lazy-rules
                      placeholder="Enter your Address"
                      :rules="[ val => val && val.length > 0 || 'Please type Address']"
                    >
                      <template v-slot:append>
                        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row">
                  <div class="q-pa-xs col-lg-12">
                    <q-input
                      outlined
                      v-model="phone"
                      label="Phone Number"
                      lazy-rules
                      placeholder="Enter your Phone Number"
                      :rules="[ val => val && val.length > 0 || 'Please type Phone Number']"
                    >
                      <template v-slot:append>
                        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row">
                  <div class="q-pa-xs col-lg-6">
                    <q-input
                      outlined
                      v-model="language"
                      label="Preferred Language"
                      lazy-rules
                      placeholder="Enter your Preferred Language"
                      :rules="[ val => val && val.length > 0 || 'Please type Preferred Language']"
                    >
                      <template v-slot:append>
                        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
                      </template>
                    </q-input>
                  </div>

                  <div class="q-pa-xs col-lg-6">
                    <q-select
                      outlined
                      v-model="education"
                      :options="options"
                      label="Education Level"
                      placeholder="Select your Education Level"
                    >
                    </q-select>
                  </div>
                </div>
              </q-form>
            </q-step>

            <q-step
              :name="2"
              prefix="2"
              title="Payment Plan"
            >
              <v-toolbar>
                <v-toolbar-title class="text-center">
                  <p class="text-h6">Payment Plan</p>
                  <p><small>Have questions about the application? Want some more info? Call us! 65170024</small></p>
                </v-toolbar-title>
              </v-toolbar>
              <div class="row">
                <div class="q-pa-xs col-lg-6">
                  <q-card v-ripple class="my-box cursor-pointer q-hoverable">
                    <q-card-section class="text-center">
                      <p><strong>PIF (pay in Full)</strong></p>
                      <p class="text-caption text-grey-6">$6.795</p>
                      <p><strong>$4,795</strong></p>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="text-center">
                      <p>Save $1500 in tuition</p>
                      <p>No processing fees</p>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="q-pa-xs col-lg-6">
                  <q-card v-ripple class="my-box cursor-pointer q-hoverable">
                    <q-card-section class="text-center">
                      <p><strong>16 installments</strong></p>
                      <p class="text-caption text-grey-6">of $399 / Month</p>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="text-center">
                      <p>Save $500 in tuition</p>
                      <p>No processing fees</p>
                      <p>0% interest rate</p>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="q-pa-xs col-lg-6">
                  <q-card v-ripple class="my-box cursor-pointer q-hoverable">
                    <q-card-section class="text-center">
                      <p><strong>24 installments</strong></p>
                      <p class="text-caption text-grey-6">of $299 / Month</p>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="text-center">
                      <p>Save $1500 in tuition</p>
                      <p>No processing fees</p>
                      <p>5.99% interest rate</p>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="q-pa-xs col-lg-6">
                  <q-card v-ripple class="my-box cursor-pointer q-hoverable">
                    <q-card-section class="text-center">
                      <p><strong>48 installments</strong></p>
                      <p class="text-caption text-grey-6">of $199 / Month</p>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="text-center">
                      <p>No processing fees</p>
                      <p>11.99% interest rate</p>
                      <p>.</p>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn @click="step === 2 ? onSubmitRegister(courseSelected) : $refs.stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'" />
                <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </template>

            <template v-slot:message>
              <q-banner v-if="step === 1" class="bg-grey-3 text-black text-center">
                Start: {{startDateCourse}} | Graduation: {{endDateCourse}}
              </q-banner>
              <q-banner v-else-if="step === 2" class="bg-grey-3 text-black text-center">
                Start: {{startDateCourse}} | Graduation: {{endDateCourse}}
              </q-banner>
            </template>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { putStudentProfile, postEnrollment } from 'boot/axios'
import { useQuasar, date, LocalStorage } from 'quasar'

export default defineComponent({
  name: 'EnrollmentProcess',
  props: {
    courseSelected : {}
  },
  computed: {
    // computed property that auto-updates when the prop changes
    startDateCourse () {
      return date.formatDate(new Date(this.courseSelected.startDate), "MMM 'YY")
    },
    endDateCourse () {
      return date.formatDate(new Date(this.courseSelected.endDate), "MMM 'YY")
    }
  },
  setup () {
    const $q = useQuasar()
    const birthdate = ref('2023/02/01')
    const gender = ref('')
    const address = ref('')
    const phone = ref('')
    const language = ref('')
    const education = ref('Bachelors degree')
    const dialog = ref(true)

    async function onSubmitRegister (courseSelected) {
      const sessionUser = LocalStorage.getItem('sessionUser')
      const dateTimeStamp = date.formatDate(birthdate.value, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      const studentUpdate = {
        birthDate:dateTimeStamp,
        gender:gender.value,
        phoneNumber:phone.value,
        address:address.value,
        language:language.value,
        educationLevel:education.value
      }
      const responseUpdate = await putStudentProfile(sessionUser, studentUpdate).catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'enrollment process failed',
          icon: 'report_problem'
        })
      })
      if (responseUpdate.status === 'Success') {
        const idUser = LocalStorage.getItem('idStudent')
        const dateNow = date.formatDate(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        const enrollment = {
          idStudent:idUser,
          idCourse:courseSelected.id,
          enrollmentDate:dateNow,
          isCancelled:false
        }
        const responseEnrollment = await postEnrollment(enrollment).catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Sign Up failed',
            icon: 'report_problem'
          })
        })
        if (responseEnrollment.status === 'Success') {
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Enrollment process course Successfully!',
            icon: 'check'
          })
          this.dialog = false
        } else {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: responseEnrollment.errors[0].errorMessage,
            icon: 'report_problem'
          })
        }
      } else {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: responseUpdate.errors[0].errorMessage,
          icon: 'report_problem'
        })
      }
    }

    return {
      onSubmitRegister,
      birthdate,
      gender,
      address,
      phone,
      language,
      education,
      step: ref(1),
      active: false,
      dialog,
      options: [
        'Upper Secondary', 'Post-secondary non-Tertiary', 'Short-cycle tertiary', 'Bachelors degree', 'Masters degree', 'Doctoral degree'
      ]
    }
  }
})
</script>
