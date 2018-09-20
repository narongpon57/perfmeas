<template>
  <div id="app">
    <div class="panel">
      <div class="panel-body">
        <app-header></app-header>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'app',
  components: {
    appHeader: Header
  },
}
</script>

<style lang="scss">
@import './assets/scss/global.scss';
</style>
