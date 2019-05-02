import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    orgType: ['Division', 'Department'],
    typeSelected: null,
    yearSelected: null,
    orgSelected: null,
    orgUnits: [],
    orgs: [],
    org: {
      id: null,
      type: null,
      code: null,
      name: null,
      creator: [],
      step1_approver: []
    }
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
  'SET_ORGS_MASTER' (state, orgUnits) {
    console.log(orgUnits)
    state.orgs = orgUnits
  },
  'SET_ORG_MASTER' (state, org) {
    state.org = {
      type: org.type,
      code: org.code,
      name: org.name,
      creator: org.creator,
      step1_approver: org.step1_approver,
      label: org.label
    }
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
        commit('SET_ORGS_MASTER', orgUnits)
      })
      .catch(err => console.log(err))
  },
  searchOrgById ({ commit }, id) {
    axios.get(`/organization_unit/${id}`)
      .then(res => res.data.result)
      .then(org => {
        commit('SET_ORG_MASTER', org)
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
