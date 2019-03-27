import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    worklists: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'SET_WORKLIST' (state, worklists) {
    state.worklists = worklists
  }
}

const actions = {
  getWorkList ({ commit }, userId) {
    axios.get('/worklist', { params: { user_id: userId } })
      .then(res => res.data.result)
      .then(worklists => {
        commit('SET_WORKLIST', worklists)
      })
      .catch(err => {
        console.log(err)
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
