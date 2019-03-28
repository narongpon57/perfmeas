import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    assessment: {
      id: null,
      year: null,
      status: null,
      created_at: null,
      risk_assessment: []
    },
    approval: [],
    approve: {
      description: null,
      assessment_id: null,
      status: null,
      approve_by: null
    },
    status: false,
    msg: ''
  }
}

const state = initialState()

const mutations = {
  updateField,
  'ADD_RISK_ASSESSMENT' (state, risks) {
    for (let risk of risks) {
      state.assessment.risk_assessment.push({
        id: null,
        probability: null,
        impact: null,
        risk_score: null,
        mitigation_strategy: null,
        risk_indicator: [],
        risk: risk
      })
    }
  },
  'REMOVE_RISK_ASSESSMENT' (state, index) {
    state.assessment.risk_assessment.splice(index, 1)
  },
  'ADD_RISK_INDICATOR' (state, payload) {
    for (let indicator of payload.indicators) {
      state.assessment.risk_assessment[payload.risk_index].risk_indicator.push({
        id: null,
        indicator: indicator
      })
    }
  },
  'REMOVE_RISK_INDICATOR' (state, { riskIndex, indIndex }) {
    let tmpRisk = state.assessment.risk_assessment.splice(riskIndex, 1)
    tmpRisk[0].risk_indicator.splice(indIndex, 1)
    state.assessment.risk_assessment.splice(riskIndex, 0, tmpRisk[0])
  },
  'SET_RETURN_MSG' (state, { msg, success }) {
    state.msg = msg
    state.success = success
  },
  'SET_SAVE_ASSESSMENT' (state, assessment) {
    const riskAssessment = state.assessment.risk_assessment
    state.assessment = {
      id: assessment.id,
      year: assessment.year,
      status: assessment.status,
      created_at: assessment.created_at,
      risk_assessment: riskAssessment
    }
  },
  'SET_SEARCH_ASSESSMENT' (state, assessment) {
    state.assessment = {
      id: assessment.id,
      year: assessment.year,
      status: assessment.status,
      created_at: assessment.created_at,
      risk_assessment: [],
      org: assessment.org
    }
    if (assessment.risk_assessment !== undefined) {
      for (let [i, riskAssessment] of Object.entries(assessment.risk_assessment)) {
        state.assessment.risk_assessment.push({
          id: riskAssessment.id,
          probability: riskAssessment.probability,
          impact: riskAssessment.impact,
          risk_score: riskAssessment.risk_score,
          mitigation_strategy: riskAssessment.mitigation_strategy,
          risk_indicator: [],
          risk: riskAssessment.risk
        })

        for (let riskIndicator of riskAssessment.risk_indicator) {
          state.assessment.risk_assessment[i].risk_indicator.push({
            id: riskIndicator.id,
            indicator: riskIndicator.indicator
          })
        }
      }
    }
  },
  'SET_ASSESSMENT_STATUS' (state, assessment) {
    state.assessment.status = assessment.status
  },
  'RESET_ASSESSMENT' (state) {
    Object.assign(state, initialState())
  },
  'RESET_STATUS' (state) {
    state.status = false
    state.msg = ''
  },
  'SET_APPROVAL' (state, approval) {
    state.approval = approval
  },
  'RESET_APPROVAL' (state) {
    state.approval = []
  },
  'ADD_APPROVAL' (state, approval) {
    state.approval.push(approval[0])
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
        commit('SET_SAVE_ASSESSMENT', assessment)
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
  },
  updateRiskAssess ({ commit }, payload) {
    let result = {
      msg: 'Update Failed!',
      success: false
    }
    axios.put('/risk_assessment', payload)
      .then(res => res.data.result)
      .then(assessment => {
        result = {
          msg: 'Update Complete!',
          success: true
        }
        commit('SET_RETURN_MSG', result)
      })
      .catch(err => {
        console.log(err)
        commit('SET_RETURN_MSG', result)
      })
  },
  searchRiskAssessment ({ commit }, payload) {
    const search = {
      org_id: payload.org.id,
      year: payload.year
    }
    const searchRisk = axios.get('/risk_assessment', { params: search })
    const seachApproval = axios.get('/approval', { params: search })
    return new Promise((resolve, reject) => {
      Promise.all([
        searchRisk,
        seachApproval
      ])
        .then(res => {
          const riskAssessment = res[0].data.result
          const approval = res[1].data.result
          if (riskAssessment.length) {
            commit('SET_SEARCH_ASSESSMENT', riskAssessment[0])
            commit('RESET_STATUS')
            localStorage.setItem('year', payload.year)
            localStorage.setItem('org', JSON.stringify(payload.org))
          } else {
            commit('RESET_ASSESSMENT')
          }

          if (approval.length) {
            commit('SET_APPROVAL', approval)
          } else {
            commit('RESET_APPROVAL')
          }
          resolve()
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  approve ({ commit }, payload) {
    console.log(payload)
    // return new Promise((resolve, reject) => {
    //   axios.post('/approval', payload)
    //     .then(res => res.data.result)
    //     .then(approval => {
    //       commit('ADD_APPROVAL', approval)
    //       return axios.get('/assessment', { params: { id: payload.assessment_id } })
    //     })
    //     .then(res => res.data.result)
    //     .then(assessment => {
    //       commit('SET_ASSESSMENT_STATUS', assessment)
    //     })
    //     .catch(err => console.log(err))
    // })
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
