<template>
  <div class="panel">
    <div class="panel-body">
      <app-header></app-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './Header'
export default {
  components: {
    appHeader: Header
  }
}
</script>

<style lang="scss">
@import '../assets/scss/global.scss';
.v-select {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 0.9rem;
}
</style>
