import { LocalStorage } from 'quasar'
const state = {
  idStudent: '',
  sessionUser: ''
}
const getters = {

}
const mutations = {
  login (state, idStudent) {
    state.idStudent = idStudent
    LocalStorage.set('idStudent', idStudent)
  },
  sessionLogin (state, sessionUser) {
    state.sessionUser = sessionUser
    LocalStorage.set('sessionUser', sessionUser)
  },
  logout (state) {
    state.idStudent = ''
    LocalStorage.clear()
  },
  initialiseStore (state) {
    if (LocalStorage.getItem('idStudent')) {
      state.idStudent = LocalStorage.getItem('idStudent')
      state.sessionUser = LocalStorage.getItem('sessionUser')
    }
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
