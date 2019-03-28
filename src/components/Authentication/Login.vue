<template>
  <div class="container">
    <div class="panel panel default">
      <div class="panel-body">
        <div class="row">
          <div class="col-md-5">
            <h2 class="font-normal text-center">Login to your account</h2>
            <div class="panel panel-default bg-content">
              <div class="panel-body">
                <form @submit.prevent="login">
                  <div class="row form-group">
                    <div class="col-md-12">
                      <label for="" class="font-normal">Enter your username</label>
                      <input type="text" v-model="username" class="form-control">
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-md-12">
                      <label for="" class="font-normal">Enter your password</label>
                      <input type="password" autocomplete="off" v-model="password" class="form-control">
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="col-md-12">
                      <input type="submit" class="btn btn-primary" value="Login">
                    </div>
                  </div>
                  <div class="text-danger text-center" v-if="msg">{{ msg }}</div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <img src="../../assets/img/login_banner.png" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('authentication/login', {
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
          this.msg = 'Incorrect Username or Password !'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/global.scss';
.btn-primary {
  width: 100%;
}
.panel {
  height: 100%;
  padding-top: 20px !important;
}
</style>
