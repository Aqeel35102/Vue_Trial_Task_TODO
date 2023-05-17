<template>
<section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div class="d-flex flex-row align-items-center justify-content-center ">
            <p class=" mb-0 me-3 text-center h1  text-primary">Welcome To Todo App.</p>
            
          </div>

          <div class="divider d-flex align-items-center my-4">
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
              <router-link class="btn btn-primary btn-lg mx-2 px-2" to="/login" v-if="!this.isLogged">Login</router-link>
              <router-link class="btn btn-primary btn-lg mx-2 px-2" to="/register" v-if="!this.isLogged">Register</router-link>
              <router-link class="btn btn-primary btn-lg mx-2 px-2" to="/todo" v-if="this.isLogged">Open Todo List</router-link>

          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    
    <div class="text-white mb-3 mb-md-0">
      Copyright © 2023. All rights reserved.
    </div>
    <div class="text-white mb-3 mb-md-0">
      Developed by M. AQEEL.
    </div>
    

    <!-- Right -->
    <div>
      <a href="#" class="text-white mr-4">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#" class="text-white mr-4">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="#" class="text-white mr-4">
        <i class="fab fa-google"></i>
      </a>
      <a href="#" class="text-white">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </div>
    <!-- Right -->
  </div>
</section>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "welcomePage",
  computed: {
        ...mapGetters({
            isLogged: 'loginModule/isLogged'
        })
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
.h-custom {
height: calc(100% - 73px);
}
@media (max-width: 450px) {
.h-custom {
height: 100%;
}
}

</style>
  