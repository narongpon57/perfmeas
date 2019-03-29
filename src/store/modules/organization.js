import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    orgType: ['Division', 'Department'],
    typeSelected: null,
    yearSelected: null,
    orgSelected: null,
    orgUnits: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'SET_ORGANIZATION_UNIT' (state, orgUnits) {
    state.orgUnits = orgUnits
  },
  'SET_SEARCH_LOCAL_ORG' (state, payload) {
    state.orgSelected = payload.org
    state.yearSelected = payload.year
  },
  'RESET_ORG' (state) {
    state.yearSelected = null
    state.orgSelected = null
    state.orgUnits = []
  },
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  }
}

const actions = {
  searchOrg ({ commit }, type) {
    axios.get('/organization_unit', {
      params: {
        type: type
      }
    })
      .then(res => res.data.result)
      .then(orgUnits => {
        commit('RESET_ORG')
        commit('SET_ORGANIZATION_UNIT', orgUnits)
      })
      .catch(err => console.log(err))
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
