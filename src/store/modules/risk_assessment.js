import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    assessments: {
      id: null,
      year: null,
      status: null,
      created_at: null,
      risk_assessment: []
    },
    risk_assessment: [],
    status: false,
    msg: '',
    assessment: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'ADD_RISK_ASSESSMENT' (state, risks) {
    for (let risk of risks) {
      state.assessments.risk_assessment.push({
        id: null,
        probability: null,
        impact: null,
        risk_score: null,
        migration_strategy: null,
        risk_indicator: [],
        risk: risk
      })
      console.log(state.assessments)
      state.risk_assessment.push(risk)
    }
  },
  'REMOVE_RISK_ASSESSMENT' (state, index) {
    state.risk_assessment.splice(index, 1)
  },
  'ADD_RISK_INDICATOR' (state, payload) {
    for (let indicator of payload.indicators) {
      state.risk_assessment[payload.risk_index].risk_indicator.push(indicator)
    }
  },
  'REMOVE_RISK_INDICATOR' (state, { riskIndex, indIndex }) {
    let tmpRisk = state.risk_assessment.splice(riskIndex, 1)
    tmpRisk[0].risk_indicator.splice(indIndex, 1)
    state.risk_assessment.splice(riskIndex, 0, tmpRisk[0])
  },
  'SET_ASSESSMENT' (state, assessment) {
    state.assessment = assessment
  },
  'SET_RETURN_MSG' (state, { msg, success }) {
    state.msg = msg
    state.success = success
  }
}

const actions = {
  addRiskAssess ({ commit }, risks) {
    commit('ADD_RISK_ASSESSMENT', risks)
  },
  removeRiskAssess ({ commit }, index) {
    commit('REMOVE_RISK_ASSESSMENT', index)
  },
  addRiskIndicator ({ commit }, payload) {
    commit('ADD_RISK_INDICATOR', payload)
  },
  removeRiskIndicator ({ commit }, payload) {
    commit('REMOVE_RISK_INDICATOR', payload)
  },
  saveRiskAssess ({ commit }, payload) {
    let result = {
      msg: 'Save Failed!',
      success: false
    }
    axios.post('/risk_assessment', payload)
      .then(res => res.data.result)
      .then(assessment => {
        console.log(assessment)
        commit('SET_ASSESSMENT', assessment)
        result = {
          msg: 'Save Complete!',
          success: true
        }
        commit('SET_RETURN_MSG', result)
      })
      .catch(err => {
        console.log(err)
        commit('SET_RETURN_MSG', result)
      })
  }
}

const getters = {
  getField,
  getRisk: state => {
    return state.risk_assessment
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
