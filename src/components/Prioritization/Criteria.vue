<template>
  <div class="prioritize-table">
    <table class="table table-bordered table-bg table-sm text-center">
      <thead class="table-head">
        <th>รหัส</th>
        <th>ชื่อตัวขี้วัด</th>
        <!-- <th>QPS Type</th> -->
        <th>Indicator Type</th>
        <th style="width:100px;" v-for="item in criteria" :key="item.id">{{ item.name }}</th>
        <th>Priority score</th>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <!-- <td></td> -->
          <td></td>
          <td colspan="9" style="background-color: antiquewhite;">น้ำหนัก</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <!-- <td></td> -->
          <td></td>
          <td style="background-color: antiquewhite;" v-for="item in criteria" :key="item.id">{{ item.weight }}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="9" style="background-color: aliceblue;">Scale</td>
          <td></td>
        </tr>
          <tr>
          <td></td>
          <td></td>
          <!-- <td></td> -->
          <td></td>
          <td style="background-color: aliceblue; text-align: left;" v-for="item in criteria" :key="item.id">
            <div v-for="scale in item.criteriaScales" :key="scale.id" v-tooltip:left="scale.value + ' ' + scale.description">{{ scale.value }} {{ scale.description | wordWrap }}</div>
          </td>
          <td></td>
        </tr>
        <tr v-for="(item, index) in prioritization" :key="item.id">
          <td class="">{{ item.code }}</td>
          <td class="text-left">{{ item.name }}</td>
          <td class="">{{ item.indicator_type }}</td>
          <td v-for="(score, i) in item.prioritization_score" :key="score.criteria_id" class="score">
            <!-- <input class="form-control" type="text" v-model="score.score"> -->
            <select v-model="score.score" class="form-control">
              <option v-for="scale in criteria[i].criteriaScales" :value="scale.value" :key="scale.id">{{ scale.value }}</option>
            </select>
          </td>
          <td v-bind:class="topScore(index)">{{ priorityScore(index) }}</td>
        </tr>
        <tr v-if="!prioritization.length">
          <td colspan="13">No Data</td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="prioritization.length && parseInt(user.id) === org.creator.id">
      <div class="col-md-12 form-group text-right">
        <button class="btn btn-info" @click="save()" v-if="!isSave">Save</button>
      </div>
      <div class="col-md-12 form-group text-center">
        <button class="btn btn-primary" @click="submit()" v-if="!isSave">Submit</button>
        <button class="btn btn-danger">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  props: {
    org: Object
  },
  data () {
    return {
      isSave: false,
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
  },
  methods: {
    priorityScore (index) {
      if (this.prioritization[index].prioritization_score !== undefined) {
        const result = this.prioritization[index].prioritization_score.reduce((total, obj, index) => {
          return total + (Number(obj.score) * this.criteria[index].weight)
        }, 0)
        this.$store.commit('prioritization/SET_PRIORITY_SCORE', {
          index,
          priority_score: result
        })
        return result
      }
    },
    topScore (index) {
      return index === 0 && this.prioritization[index].priority_score > 0 ? 'top-score-text' : ''
    },
    save () {
      this.$store.dispatch('prioritization/savePrioritization', {
        prioritization: this.prioritization
      })
      this.isSave = false
    },
    submit () {
      this.$store.dispatch('prioritization/savePrioritization', {
        prioritization: this.prioritization
      })
      this.isSave = false
    }
  },
  computed: {
    ...mapFields('prioritization', [
      'criteria',
      'count',
      'prioritization'
    ])
  },
  filters: {
    wordWrap (value) {
      return value.split(' ')[0] + '..'
    }
  }
}
</script>

<style lang="scss" scoped>
.prioritize-table {
  table {
    font-size: 12px;
    tr {
      td {
        select {
          margin: 0 auto;
          width: 70%;
          text-align: center;
        }
      }
    }
  }
  .btn-primary {
    margin: 0 10px;
  }
  .top-score-text {
    background-color: red;
    color: white;
    font-weight: bold;
  }
}
</style>
