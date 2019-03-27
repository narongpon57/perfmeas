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
                v-for="worklist in worklists"
                :key="worklist.id"
                @click="getRiskAssessment(worklist)">
                <td>{{ worklist.org.type }}</td>
                <td>{{ worklist.org.code }}</td>
                <td>{{ worklist.org.name }}</td>
                <td>{{ worklist.year }}</td>
                <td>{{ worklist.status }}</td>
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

export default {
  created() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user.is_admin == 0) {
      this.$store.dispatch('worklist/getWorkList', user.id)
    }
  },
  methods: {
    getRiskAssessment (worklist) {
      console.log(worklist)
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
