<template>
    <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form @submit="onSubmit">
          <div class="d-flex flex-row align-items-center justify-content-center ">
            <p class=" mb-0 me-3 text-center h3 text-primary">Update Todo</p>
            
          </div>

          <div class="divider d-flex align-items-center my-4">
          </div>

          <!-- Email input -->
          <div class="form-outline mb-2">
            <label class="form-label" for="title">Title</label>
            <input type="text" id="title" class="form-control form-control-lg"
              placeholder="Enter a Title"
              v-model="form.title" />
          </div>

          <!-- Password input -->
          <div class="form-outline mb-2">
            <label class="form-label" for="desc">Description</label>
            <textarea name="" class="form-control form-control-lg" id="desc" rows="10"
            v-model="form.description"></textarea>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;" :disabled="please_wait">Update</button>
              <router-link class="link-danger mx-3" to="/todo">View Todo List</router-link>
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
  name: "updateTodo",
  computed: {
        ...mapGetters({
          editTodo: 'todoModule/todo',

        })
    },
    data () {
        return {
            form: {
                id:'',
                title: '',
                description: ''
            },
            please_wait:false,

        }
    },
    async created () {
      try {
        if(this.$route.params.id) {
          this.please_wait=true;
            await this.$store.dispatch('todoModule/getTodo', this.$route.params.id).then(() => {
                this.form = this.editTodo;
            })
        }
      } catch (error) {
        console.log('error',error);
      }
      this.please_wait=false;
    },
    mounted () {
    },
    methods: {
        async onSubmit (event) {
            event.preventDefault();
            //simple validation
            if(this.form.title=='' || this.form.description=='' || this.form.id==''){
              this.$toast.warning(`Please Enter Valid Title and Description.`);
              return;
            }
            this.please_wait=true;
            //call/dispatch update function in loginModule
            await this.$store.dispatch('todoModule/update', {toast:this,...this.form})
            this.please_wait=false;
             this.$router.push('/todo').catch(() => {})
        }
    }
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