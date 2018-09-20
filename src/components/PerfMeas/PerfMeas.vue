<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Performance Measurement</div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Type </label>
              <v-select v-model="orgTypeSelected" :options="orgType"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Code </label>
              <v-select v-model="orgCodeSelected" :options="orgCode"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Name </label>
              <v-select v-model="orgNameSelected" :options="orgName"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Data of Year </label>
              <v-select v-model="yearSelected" :options="year"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6 text-right">
              <button class="btn btn-info">Search</button>
            </div>
            <div class="col-md-6">
              <button class="btn btn-danger">Clear</button>
            </div>
          </div>
        </div>
        <div class="perfmeas-table">
          <table class="table table-bordered table-bg table-sm text-center">
            <thead class="table-head">
              <th></th>
              <th></th>
              <th>รหัส</th>
              <th>ชื่อตัวขี้วัด</th>
              <th>ตัวตั้ง (a) / ตัวหาร (b)</th>
              <th>สูตรการคำนวณ</th>
              <th>หน่วย</th>
              <th>ระยะเวลา</th>
              <th>เครื่องหมาย</th>
              <th>เป้าหมาย</th>
              <th style="width:4%;">ม.ค.</th>
              <th style="width:4%;">ก.พ.</th>
              <th style="width:4%;">มี.ค.</th>
              <th style="width:4%;">เม.ย.</th>
              <th style="width:4%;">พ.ค.</th>
              <th style="width:4%;">มิ.ย.</th>
              <th style="width:4%;">ก.ค.</th>
              <th style="width:4%;">ส.ค.</th>
              <th style="width:4%;">ก.ย.</th>
              <th style="width:4%;">ต.ค.</th>
              <th style="width:4%;">พ.ย.</th>
              <th style="width:4%;">ธ.ค.</th>
              <th>YTD</th>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2"><i class="fas fa-times"></i></td>
                <td rowspan="2"></td>
                <td rowspan="2">BHQ10283666</td>
                <td rowspan="2">% ความพึงพอใจมาก ความรวดเร็วในการให้ข้อมูล</td>
                <td>จำนวนผู้ให้คะแนนความพึงพอใจสูงสุด ความรวดเร็วในการให้ข้อมูล/จำนวนลูกค้าที่โทรสอบถามความพึงพอใจทั้งหมด เปอร์เซ็น</td>
                <td rowspan="2">(a/b)*100</td>
                <td rowspan="2">ร้อยละ</td>
                <td rowspan="2">รายเดือน</td>
                <td rowspan="2">></td>
                <td rowspan="2">50.00</td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td>0.00</td>
              </tr>
              <tr>
                <td>จำนวนลูกค้าที่โทรสอบถามความพึงพอใจทั้งหมด</td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td>0.00</td>
              </tr>
              <tr style="background-color: antiquewhite;">
                <td colspan="10"></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td rowspan="2"><i class="fas fa-times"></i></td>
                <td rowspan="2"></td>
                <td rowspan="2">BHQ10283666</td>
                <td rowspan="2">% ความพึงพอใจมาก ความรวดเร็วในการให้ข้อมูล</td>
                <td>จำนวนผู้ให้คะแนนความพึงพอใจสูงสุด ความรวดเร็วในการให้ข้อมูล/จำนวนลูกค้าที่โทรสอบถามความพึงพอใจทั้งหมด เปอร์เซ็น</td>
                <td rowspan="2">(a/b)*100</td>
                <td rowspan="2">ร้อยละ</td>
                <td rowspan="2">รายเดือน</td>
                <td rowspan="2">></td>
                <td rowspan="2">50.00</td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td>0.00</td>
              </tr>
              <tr>
                <td>จำนวนลูกค้าที่โทรสอบถามความพึงพอใจทั้งหมด</td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td>0.00</td>
              </tr>
              <tr style="background-color: antiquewhite;">
                <td colspan="10"></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orgType: ['Bu', 'Department'],
      orgCode: ['BHQ', 'GLS001', 'GLS002', 'GLS003'],
      orgName: ['BU.Back Office', 'BU.OPD', 'BU.IPD'],
      year: ['2017', '2018', '2019', '2020'],
      orgTypeSelected: '',
      orgCodeSelected: '',
      orgNameSelected: '',
      yearSelected: '',
      isSearch: false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  button {
    margin: 0 5px;
  }
}
.perfmeas-table {
  table {
    font-size: 12px;
    tr {
      td {
        input {
          width: 100%;
          // height: 30px;
          text-align: center;
        }
        i {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
