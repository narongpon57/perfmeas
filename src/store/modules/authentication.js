import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    worklist: []
  }
}

const state = initialState()

const mutations = {
  updateField
}

const actions = {
  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/login', payload)
        .then(res => res.data)
        .then(users => {
          localStorage.setItem('token', users.token)
          localStorage.setItem('user', JSON.stringify({
            id: users.user.id,
            username: users.user.username,
            is_admin: users.user.is_admin
          }))
          resolve()
        })
        .catch(err => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          reject(err)
        })
    })
  }
}

const getters = {
  getField
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
