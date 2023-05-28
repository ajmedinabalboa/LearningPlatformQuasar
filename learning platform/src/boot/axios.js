import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:8080' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }

export function getAvailableCourses () {
  return api.get('/api/course/available')
    .then(response => response.data.results)
}

export function getCoursesEnrolled (idStudent) {
  return api.get('/api/enrollment/courses/' + idStudent)
    .then(response => response.data.results)
}

export function getStudent (username) {
  return api.get('/api/student/' + username)
    .then(response => response.data)
}

export function putStudentProfile (sessionUser, studentUpdate) {
  return api.put('/api/student/update/' + sessionUser, studentUpdate, { 'Content-Type': 'application/json' })
    .then(response => response.data)
}

export function putUnsubscribeCourse (studentCourse, unsubscribe) {
  return api.put('/api/enrollment/unsubscribe/' + studentCourse, unsubscribe, { 'Content-Type': 'application/json' })
    .then(response => response.data)
}

export function postEnrollment (enrollment) {
  return api.post('/api/enrollment/register', enrollment, { 'Content-Type': 'application/json' })
    .then(response => response.data)
}

export function postLogin (login) {
  return api.post('/login', login, { 'Content-Type': 'application/json' })
    .then(response => response)
}

export function postRegisterStudent (student) {
  return api.post('/api/student/register', student, { 'Content-Type': 'application/json' })
    .then(response => response.data)
}
