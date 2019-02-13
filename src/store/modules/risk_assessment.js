const state = {
  risk: [
    {
      id: 'R001',
      risk_type: 'General Risk',
      problem_area: 'ความเสี่ยง General Risk',
      identified: 'Back Office',
      description: 'Back Office'
    },
    {
      id: 'R002',
      risk_type: 'General Risk',
      problem_area: 'ความเสี่ยง General Risk',
      identified: 'Back Office',
      description: 'Back Office'
    }
  ]
}

const mutation = {}

const actions = {}

const getters = {
  getRisk (state) {
    return state.risk
  }
}

export default {
  state,
  mutation,
  actions,
  getters
}
