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
              <router-link to="/measurement_domain" tag="li"><a>Measurement Domain</a></router-link>
              <a class="dropdown-item" href="#">Standard</a>
              <a class="dropdown-item" href="#">Oraganization Management</a>
              <a class="dropdown-item" href="#">User Management</a>
              <a class="dropdown-item" href="#">Category Management</a>
              <a class="dropdown-item" href="#">Risk Management</a>
              <a class="dropdown-item" href="#">Indicator Management</a>
              <a class="dropdown-item" href="#">Period Management</a>
              <a class="dropdown-item" href="#">Prioritization Criteria</a>
              <a class="dropdown-item" href="#">Approve List</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
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
        color: rgba(0,0,0,.5);
        &:hover {
          color: rgba(0,0,0,.7);
          text-decoration: none;
        }
      }
    }
    .active {
      a {
        color: rgba(0,0,0,.9);
      }
    }
  }
</style>
