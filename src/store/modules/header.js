const state = {
  topic: 'My Worklist'
}

const mutations = {
  'SET_TOPIC' (state, topic) {
    state.topic = topic
  }
}

const actions = {
  setTopic ({ commit }, topic) {
    commit('SET_TOPIC', topic)
  }
}

const getters = {
  topic (state) {
    return state.topic
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
