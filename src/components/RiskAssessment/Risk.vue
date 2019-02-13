<template>
  <div class="col-md-12 text-center">
    <table class="table table-bg">
      <thead class="table-head">
        <th></th>
        <th>รหัสความเสี่ยง</th>
        <th>ประเภทความเสี่ยง</th>
        <th>ปัญหาหรือกิจกรรมที่เป็นความเสี่ยง</th>
        <th>รายการความเสี่ยง</th>
        <th>คำอธิบาย</th>
        <th>โอกาสเกิดเหตุ</th>
        <th>ความรุนแรงของผลกระทบ</th>
        <th>คะแนนความเสี่ยง</th>
        <th>ตัวชี้วัดปัจจุบัน</th>
        <th>กลยุทธ์จัดการความเสี่ยง</th>
        <!-- <th>Risk Owner</th> -->
      </thead>
      <tbody>
        <tr
          v-for="(risk, index) in risks"
          :key="risk.id">
          <td></td>
          <td>{{ risk.id }}</td>
          <td>{{ risk.risk_type }}k</td>
          <td>{{ risk.problem_area }}</td>
          <td>{{ risk.identified }}</td>
          <td>{{ risk.description }}</td>
          <td><input
            type="number"
            class="form-control"
            @input="cal(index)"
            v-model="probability[index]"></td>
          <td><input
            type="number"
            class="form-control"
            @input="cal(index)"
            v-model="impact[index]"></td>
          <td><input
            type="text"
            class="form-control"
            readonly="readonly"
            v-model="risk_score[index]"></td>
          <td>% ความพึงพอใจมาก ความรวดเร็วในการให้ข้อมูล</td>
          <td><textarea
            row="3"
            class="form-control"
            v-model="mitigation_strategy[index]"></textarea></td>
        </tr>
      </tbody>
    </table>
    <div class="col-md-12">
      <button class="btn btn-primary" @click="save()">Save</button>
      <button class="btn btn-danger">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['risks'],
  data () {
    return {
      probability: [],
      impact: [],
      risk_score: [],
      mitigation_strategy: []
    }
  },
  methods: {
    save () {
      this.risks.map((risk, index) => {
        const riskAssessment = {
          risk_id: risk.id,
          probability: this.probability[index],
          impact: this.impact[index],
          risk_score: this.risk_score[index],
          mitigation_strategy: this.mitigation_strategy[index]
        }
        console.log(riskAssessment)
      })
    },
    cal (index) {
      console.log(1)
      let score = this.probability[index] * this.impact[index]
      this.risk_score[index] = isNaN(score) ? '' : score
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-primary {
  margin: 0 5px;
}
table {
  font-size: 12px;
  tbody {
    font-weight: 700;
    input[type="text"],
    input[type="number"] {
      text-align: center;
      height: 30px;
      width: 50%;
      margin: 0 auto;
    }
  }
}
</style>
