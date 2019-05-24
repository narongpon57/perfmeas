import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'
import Vue from 'vue'

const initialState = () => {
  return {
    criteria: [],
    prioritization: [],
    count: 0,
    perf: [],
    msg: null,
    topScore: 0
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
  'SET_PERF' (state, perf) {
    state.perf = perf
  },
  'SET_PRIORITY_SCORE' (state, payload) {
    state.prioritization[payload.index].priority_score = payload.priority_score
  },
  'SET_RETURN_MSG' (state, msg) {
    state.msg = msg
  },
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  },
  'SET_TOP_SCORE' (state, score) {
    state.topScore = score === null ? 0 : score
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

    const perf = axios.get('/performance_measurement', { params: search })
    const prioritization = axios.get('/prioritization', { params: search })
    return new Promise((resolve, reject) => {
      Promise.all([
        perf,
        prioritization
      ])
        .then(res => {
          const perf = res[0].data.result
          const prioritization = res[1].data.result
          commit('SET_PERF', perf)
          commit('SET_PRIORITIZATION', prioritization)
          const topScore = prioritization.reduce((max, obj) => {
            return obj.priority_score > max ? obj.priority_score : max
          }, 0)
          commit('SET_TOP_SCORE', topScore)
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
          // console.log(state.prioritization)
          // const uniqueIndicator = Array.from(new Set(state.prioritization.map(a => a.code)))
          //   .map(code => {
          //     return state.prioritization.find(a => a.code === code)
          //   })
          // console.log(uniqueIndicator)
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  savePrioritization ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/prioritization', payload)
        .then(res => {
          const topScore = payload.prioritization.reduce((max, obj) => {
            return obj.priority_score > max ? obj.priority_score : max
          }, 0)
          commit('SET_TOP_SCORE', topScore)
          resolve()
        })
        .catch(err => {
          reject(err)
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
