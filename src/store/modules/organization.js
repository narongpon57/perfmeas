import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    units: [],
    codes: [],
    names: [],
    orgSelectedName: '',
    orgSelectedCode: '',
    yearSelected: '',
    orgSelectedType: '',
    orgSelected: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'SET_ORGANIZATION_UNIT' (state, orgUnits) {
    for (let org of orgUnits) {
      state.units.push(org)
      state.codes.push(org.code)
      state.names.push(org.name)
    }
  },
  'SET_ORG_SELECTED_NAME' (state, value) {
    state.orgSelectedName = value
  },
  'SET_ORG_SELECTED_CODE' (state, value) {
    state.orgSelectedCode = value
  },
  'RESET_ORG_STATE' (state) {
    state.orgSelectedName = ''
    state.orgSelectedCode = ''
    state.yearSelected = ''
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
        commit('RESET_ORG_STATE')
        console.log(orgUnits)
        commit('SET_ORGANIZATION_UNIT', orgUnits)
      })
      .catch(err => console.log(err))
  }
}

const getters = {
  getField,
  filterByOrgName: () => {
    for (let org of state.units) {
      if (org.name === state.orgSelectedName) {
        state.orgSelectedCode = org.code
        state.orgSelected = org
      }
    }
  },
  filterByOrgCode: () => {
    for (let org of state.units) {
      if (org.code === state.orgSelectedCode) {
        state.orgSelectedName = org.name
        state.orgSelected = org
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
