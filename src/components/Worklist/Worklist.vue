<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">My Worklist</div>
        <div class="container">
          <p>Risk Assessment</p>
          <table class="table table-bg">
            <thead class="table-head text-center">
              <th>Organization Type</th>
              <th>Organization Code</th>
              <th>Organization Name</th>
              <th>Data of Year</th>
              <th>Status</th>
            </thead>
            <tbody>
              <tr
                class="worklist-row"
                v-for="assessment in worklists"
                :key="assessment.id"
                @click="search(assessment)">
                <td>{{ assessment.org.type }}</td>
                <td>{{ assessment.org.code }}</td>
                <td>{{ assessment.org.name }}</td>
                <td>{{ assessment.year }}</td>
                <td>{{ assessment.status }}</td>
              </tr>
              <tr v-if="!worklists.length" class="text-center">
                <td colspan="4">No Worklist</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
  created () {
    let user = JSON.parse(localStorage.getItem('user'))
    if (parseInt(user.is_admin) === 0) {
      this.$store.dispatch('worklist/getWorkList', user.id)
    }
  },
  methods: {
    ...mapActions('riskAssessment', [
      'searchRiskAssessment'
    ]),
    search (assessment) {
      localStorage.setItem('year', assessment.year)
      localStorage.setItem('org', JSON.stringify(assessment.org))
      this.$router.push('/risk_assessment')
    }
  },
  computed: {
    ...mapFields('worklist', [
      'worklists'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container {
  p {
    font-weight: bold;
  }
  table {
    font-size: 0.9rem;
    .worklist-row {
      cursor: pointer;
    }
  }
}
</style>
