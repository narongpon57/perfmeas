import Worklist from './components/Worklist/Worklist.vue'
import RiskAssessment from './components/RiskAssessment/RiskAssessment.vue'
import Prioritization from './components/Prioritization/Prioritization.vue'
import PerfMeas from './components/PerfMeas/PerfMeas.vue'

import Domain from './components/Admin/Domain/Domain.vue'
import DomainForm from './components/Admin/Domain/DomainForm.vue'

import Standard from './components/Admin/Standard/Standard.vue'
import StandardForm from './components/Admin/Standard/StandardForm.vue'

import Category from './components/Admin/Category/Category.vue'
import CategoryForm from './components/Admin/Category/CategoryForm.vue'

import Risk from './components/Admin/Risk/Risk.vue'
import RiskForm from './components/Admin/Risk/RiskForm.vue'

import RiskType from './components/Admin/RiskType/RiskType.vue'
import RiskTypeForm from './components/Admin/RiskType/RiskTypeForm.vue'

import Criteria from './components/Admin/Criteria/Criteria.vue'
import CriteriaForm from './components/Admin/Criteria/CriteriaForm.vue'

import User from './components/Admin/User/User.vue'
import UserForm from './components/Admin/User/UserForm.vue'

import Period from './components/Admin/Period/Period.vue'
import PeriodForm from './components/Admin/Period/PeriodForm.vue'

import Organization from './components/Admin/Organization/Organization.vue'
import OrganizationForm from './components/Admin/Organization/OrganizationForm.vue'

import Approve from './components/Admin/Approve/Approve.vue'

export const routes = [
  { path: '/worklist', component: Worklist },
  { path: '/risk_assessment', component: RiskAssessment },
  { path: '/prioritization', component: Prioritization },
  { path: '/performance_measurement', component: PerfMeas },
  { path: '/measurement_domain', component: Domain },
  { path: '/measurement_domain_form', component: DomainForm },
  { path: '/standard', component: Standard },
  { path: '/standard_form', component: StandardForm },
  { path: '/category', component: Category },
  { path: '/category_form', component: CategoryForm },
  { path: '/risk_type', component: RiskType },
  { path: '/risk_type_form', component: RiskTypeForm },
  { path: '/risk', component: Risk },
  { path: '/risk_form', component: RiskForm },
  { path: '/prioritization_criteria', component: Criteria },
  { path: '/prioritization_criteria_form', component: CriteriaForm },
  { path: '/user_management', component: User },
  { path: '/user_management_form', component: UserForm },
  { path: '/approve_list', component: Approve },
  { path: '/period_management', component: Period },
  { path: '/period_management_form', component: PeriodForm },
  { path: '/organization_management', component: Organization },
  { path: '/organization_management_form', component: OrganizationForm }
]
