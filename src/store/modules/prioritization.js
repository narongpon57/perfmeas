import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'
import Vue from 'vue'

const initialState = () => {
  return {
    criteria: [],
    prioritization: [],
    count: 0
  }
}

const state = initialState()

const mutations = {
  updateField,
  'SET_CRITERIA' (state, criteria) {
    state.criteria = criteria
    state.count = criteria.length
  },
  'SET_PRIORITIZATION' (state, prioritization) {
    state.prioritization = prioritization
  },
  'SET_PRIORITIZATION_SCORE' (state, payload) {
    Vue.set(state.prioritization[payload.index], 'prioritization_score', [])
    for (let [i, item] of Object.entries(state.criteria)) {
      state.prioritization[payload.index].prioritization_score.push({
        prioritization_id: payload.score.length ? payload.score[i].id : null,
        criteria_id: item.id,
        score: payload.score.length ? payload.score[i].score : 0
      })
    }
  },
  'SET_PRIORITY_SCORE' (state, payload) {
    state.prioritization[payload.index].priority_score = payload.priority_score
  },
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  }
}

const actions = {
  getCriteria ({ commit }) {
    axios.get('/criteria')
      .then(res => res.data.result)
      .then(criteria => {
        commit('SET_CRITERIA', criteria)
      })
      .catch(err => console.log(err))
  },
  searchPrioritization ({ commit }, payload) {
    const search = {
      org_id: payload.org.id,
      year: payload.year
    }
    return new Promise((resolve, reject) => {
      axios.get('/prioritization', { params: search })
        .then(res => res.data.result)
        .then(prioritization => {
          commit('SET_PRIORITIZATION', prioritization)
          if (prioritization.length) {
            for (let [i, item] of Object.entries(prioritization)) {
              axios.get('/prioritization_score', {
                params: {
                  id: item.risk_assessment_indicator_id
                }
              })
                .then(res => res.data.result)
                .then(score => {
                  commit('SET_PRIORITIZATION_SCORE', {
                    score,
                    index: i
                  })
                })
            }
          }
          resolve()
        })
        .catch(err => console.log(err))
    })
  },
  savePrioritization ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/prioritization', payload)
        .then(res => {
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}

const getters = {
  getField,
  getPrioritizationCriteria (state) {
    return state.criteria
  },
  countPrioritizationCriteria () {
    return state.criteria.length
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
