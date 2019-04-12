import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'
import Vue from 'vue'

const initialState = () => {
  return {
    users: [],
    user: {
      employee_code: null,
      first_name: null,
      last_name: null,
      email: null,
      username: null,
      org: []
    }
  }
}

const state = initialState()

const mutations = {
  updateField,
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  },
  'SET_USERS' (state, users) {
    for (let user of users) {
      let displaySearch = `${user.employee_code} - ${user.first_name} ${user.last_name}`
      Vue.set(user, 'label', displaySearch)
    }
    state.users = users
  },
  'SET_USER' (state, user) {
    state.user = user
  }
}

const actions = {
  searchUser ({ commit }, codition) {
    return new Promise((resolve, reject) => {
      axios.get('/user', { params: codition })
        .then(res => res.data.result)
        .then(users => {
          commit('SET_USERS', users)
          resolve()
        })
        .catch(err => console.log(err))
    })
  },
  getUsers ({ commit }) {},
  getUserById ({ commit }, id) {
    axios.get(`/user/${id}`)
      .then(res => res.data.data)
      .then(user => {
        commit('SET_USER', user)
      })
      .catch(err => console.log(err))
  },
  savePermission ({ commit }, payload) {},
  updatePermission ({ commit }, payload) {}
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
