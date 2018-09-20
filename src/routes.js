import Worklist from './components/Worklist/Worklist.vue'
import RiskAssessment from './components/RiskAssessment/RiskAssessment.vue'
import Prioritization from './components/Prioritization/Prioritization.vue'
import PerfMeas from './components/PerfMeas/PerfMeas.vue'

export const routes = [
  { path: '/worklist', component: Worklist },
  { path: '/risk_assessment', component: RiskAssessment },
  { path: '/prioritization', component: Prioritization },
  { path: '/performance_measurement', component: PerfMeas }
]
