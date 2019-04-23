<template>
  <div class="container-fluid">
    <div class="brand text-right">
      <img class="logo" src="../assets/img/logo_permeas.png">
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/worklist" activeClass="active" tag="li"><a>My Worklist</a></router-link>
          <router-link to="/risk_assessment" activeClass="active" tag="li"><a>Risk Assessment</a></router-link>
          <router-link to="/prioritization" activeClass="active" tag="li"><a>Prioritization</a></router-link>
          <router-link to="/performance_measurement" activeClass="active" tag="li"><a>Performance Measurement</a></router-link>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Administrator
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <!-- <router-link to="/measurement_domain" tag="li"><a>Measurement Domain</a></router-link> -->
              <!-- <router-link to="/standard" tag="li"><a>Standard</a></router-link> -->
              <router-link to="/organization_management" tag="li"><a>Organization Management</a></router-link>
              <router-link to="/user_management" tag="li"><a>User Management</a></router-link>
              <!-- <router-link to="/category" tag="li"><a>Category Management</a></router-link> -->
              <router-link to="/risk" tag="li"><a>Risk Management</a></router-link>
              <!-- <router-link to="/risk_type" tag="li"><a>Risk Type</a></router-link> -->
              <router-link to="/indicator" tag="li"><a>Indicator Management</a></router-link>
              <router-link to="/period_management" tag="li"><a>Period Management</a></router-link>
              <!-- <router-link to="/prioritization_criteria" tag="li"><a>Prioritization Criteria</a></router-link> -->
              <!-- <router-link to="/approve_list" tag="li"><a>ApproveList</a></router-link> -->
            </div>
          </li>
        </ul>
        <div class="user">
          <font-awesome-icon class="icon" icon="user"/>{{ username }}
        </div>
        <button class="logout btn btn-default" @click="logout">
          Logout <font-awesome-icon class="icon" icon="sign-out-alt"/>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: JSON.parse(localStorage.getItem('user')).username
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.dispatch('resetAllState')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container-fluid {
    margin-bottom: 30px;
  }
  .navbar {
    background-image: linear-gradient(to bottom, #fff 0, #eee 100%);
    border-radius: 4px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 5px rgba(0, 0, 0, .075);
    background-color: #f8f8f8;
    border: 1px solid #eee;
  }
  .brand {
    margin-bottom: 20px;
  }
  .logo {
    height: 60px;
  }
  .navbar-nav {
    li {
      a {
        display: block;
        padding: .5rem 1rem;
        color: rgba(0,0,0, .7);
        &:hover {
          color: #000;
          text-decoration: none;
        }
      }
    }
    .active {
      a {
        color: #000;
      }
    }
  }
  .dropdown-menu {
    min-width: 15rem;
  }
  .user,
  .logout {
    margin-right: 2rem;
  }
  .icon {
    margin: 0 0.3rem;
  }
</style>
