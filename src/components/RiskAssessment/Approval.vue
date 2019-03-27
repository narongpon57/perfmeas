<template>
  <table class="table table-bg">
    <thead class="table-head">
      <th>Comment Type</th>
      <th>Comment By</th>
      <th>Comments</th>
      <th>Comment Datetime</th>
    </thead>
    <tbody>
      <tr v-for="item in approval" :key="item.id">
        <td>{{ item.status }}</td>
        <td>{{ item.step2_approver_id === null ? item.step1_approver_name : item.step2_approver_name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.approved_at_dateformat }}</td>
      </tr>
    </tbody>
    <tbody></tbody>
  </table>
</template>

<script>
export default {
  props: ['approval']
}
</script>

<style>

</style>
