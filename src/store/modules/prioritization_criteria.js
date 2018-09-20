const state = {
  prioritization_criteria: [
    {
      name: 'Related to goal and strategy',
      weight: 5,
      scale: [
        {
          val: 0,
          label: 'ไม่เกี่ยวข้อง กับเป้าหมายหรือกลยุทธ์ขององค์กร'
        },
        {
          val: 5,
          label: 'เกี่ยวข้อง กับเป้าหมายหรือกลยุทธ์ขององค์กร'
        }
      ] },
    {
      name: 'High Risk event',
      weight: 10,
      scale: [
        {
          val: 0,
          label: 'ความเสี่ยงต่ำมาก อยู่ในระดับที่ยอมรับได้ โดยไม่ต้องการมีการจัดการเพิ่มเติม'
        },
        {
          val: 1,
          label: 'ความเสี่ยงต่ำ อยู่ในระดับที่ยอมรับได้ แต่ต้องมีเริ่มควบคุม'
        },
        {
          val: 2,
          label: 'ความเสี่ยงปานกลาง อยู่ในระดับที่พอยอมรับได้ ต้องเร่งวางแนวทางป้องกันเพิ่มเติม'
        },
        {
          val: 3,
          label: 'ความเสี่ยงปานกลางเกือบสูง อยู่ในระดับค่อนข้างรับไม่ได้ ต้องพยายามลดความเสี่ยง'
        },
        {
          val: 4,
          label: 'ความเสี่ยงสูง อยู่ในระดับที่ยอมรับไม่ได้ ต้องดำเนินการจัดการความเสี่ยง'
        },
        {
          val: 5,
          label: 'ความเสี่ยงสูงมาก อยู่ในระดับที่ยอมรับไม่ได้ ต้องดำเนินการจัดการความเสี่ยงทันที'
        }
      ]
    },
    { name: 'High volume event', weight: 10 },
    { name: 'Problem prone in organization/ department', weight: 10 },
    { name: 'Related to law and regulation', weight: 5 },
    { name: 'Related to standard required for accreditation', weight: 5 },
    { name: 'Related to customer complaint/ satisfaction', weight: 5 },
    { name: 'Poor performance ', weight: 5 },
    { name: 'Necessary to address a project', weight: 5 }
  ]
}

const mutations = {}

const actions = {}

const getters = {
  getPrioritizationCriteria (state) {
    return state.prioritization_criteria
  },
  countPrioritizationCriteria () {
    return state.prioritization_criteria.length
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
